import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';
import {Socket} from 'ngx-socket-io';
import {AuthService} from './auth.service';
import {ChatService} from './chat.service';
import {IUser} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public chatMessagesList$: BehaviorSubject<Array<IMessage>> = new BehaviorSubject<Array<IMessage>>([]);
  public somebodyTyping$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  private joinedRooms = [];

  constructor(private http: HttpClient,
              private socket: Socket,
              private auth: AuthService,
              private chat: ChatService) {
  }

  // tslint:disable-next-line:variable-name
  public connect(auth_token) {
    this.socket.ioSocket.io.opts.query = {auth_token};
    this.socket.connect();
    this.subscribeOnEvents();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public joinChat(id) {
    if (!this.joinedRooms.includes(id)) {
      this.joinedRooms.push(id);
    }
    setTimeout(() => {
      this.socket.emit('join', id);
    }, 500);
  }

  public leaveChat(id) {
    const i = this.joinedRooms.indexOf(id);
    if (i > -1) {
      this.joinedRooms.splice(i, 1);
    }
    this.socket.emit('leave', id);
  }

  public setUserTyping(isTyping: boolean) {
    this.socket.emit(`${isTyping ? 'start' : 'end'}-typing`, this.chat.currentChat$.value._id);
  }

  private subscribeOnEvents() {
    this.socket.on('send', (message) => {
      this.pushMessage(message);
    });
    this.socket.on('delete', (message) => {
      this.deleteMessageFromList(message._id || message);
    });
    this.socket.on('start-typing', ({userId, dialog}) => {
      const currentChat = this.chat.currentChat$.value;
      const member = currentChat.members.find(user => user._id === userId);
      if (dialog === currentChat._id && member) {
        this.somebodyTyping$.next(member);
      }
    });
    this.socket.on('end-typing', ({dialog}) => {
      if (dialog === this.chat.currentChat$.value._id) {
        this.somebodyTyping$.next(null);
      }
    });
  }

  private deleteMessageFromList(id) {
    const messages = [...this.chatMessagesList$.value];
    const i = messages.findIndex(msg => msg._id === id);
    if (i > -1) {
      messages.splice(i, 1);
      this.chatMessagesList$.next([...messages]);
    }
    if (this.chat.currentChat$.value.lastMessage._id === id) {
      this.chat.currentChat$.next({
        ...this.chat.currentChat$.value,
        lastMessage: messages[messages.length - 1]
      });
    }
  }

  private pushMessage(message: IMessage) {
    if (message.dialog === this.chat.currentChat$.value._id) {
      this.chatMessagesList$.next([...this.chatMessagesList$.value, message]);
    }
    this.chat.setLastMessage(message);
  }

  public getMessages(dialogId) {
    return this.http.get('messages/' + dialogId)
      .pipe(
        tap((messages: Array<IMessage>) => {
          this.chatMessagesList$.next(messages);
        }),
        map((messages: Array<IMessage>) => messages));
  }

  public deleteMessage(messageId: string) {
    this.socket.emit('delete', {messageId});
    this.deleteMessageFromList(messageId);
  }

  public sendMessage(body: string, dialog: string) {
    this.socket.emit('send', {dialog, body});
    const message: IMessage = {
      body,
      dialog,
      owner: this.auth.currentUser,
      createdAt: new Date()
    };
    this.pushMessage(message);
  }
}
