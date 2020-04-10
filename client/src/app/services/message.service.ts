import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';
import {Socket} from 'ngx-socket-io';
import {AuthService} from './auth.service';
import {ChatService} from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public chatMessagesList$: BehaviorSubject<Array<IMessage>> = new BehaviorSubject<Array<IMessage>>([]);

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
    console.log('join', id)
    setTimeout(() => {
      this.socket.emit('join', id);
    }, 500);
  }

  private subscribeOnEvents() {
    this.socket.on('send', (message) => {
      console.log(message);
      this.pushMessage(message);
    });
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

  sendMessage(body: string, dialog: string) {
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
