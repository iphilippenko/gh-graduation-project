import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IChat} from '../interfaces/chat.interface';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatList$: BehaviorSubject<Array<IChat>> = new BehaviorSubject<Array<IChat>>([]);
  public currentChat$: BehaviorSubject<IChat | null> = new BehaviorSubject<IChat | null>(null);
  public chatLeave$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public setLastMessage(message) {
    const chatList = [...this.chatList$.value];
    const chatIndex = chatList.findIndex(chat => chat._id === message.dialog);
    if (chatIndex > -1) {
      chatList[chatIndex].lastMessage = message;
      this.chatList$.next([...chatList]);
    }
  }

  public findChatById(id: string) {
    const chat = this.chatList$.value.find(item => item._id === id);
    if (chat) {
      this.currentChat$.next(chat);
    }
  }

  public getChatList() {
    return this.http.get('dialogs')
      .pipe(
        tap((chats: Array<IChat>) => {
          this.chatList$.next(chats);
        }),
        map((chats: Array<IChat>) => chats));
  }

  public createChat(data): Observable<IChat> {
    const userId = this.auth.currentUser._id;
    data.owners ? data.owners.push(userId) : data.owners = [userId];
    if (!data.members.some(member => member === userId)) {
      data.members.push(userId);
    }

    return this.http.post('dialogs', data)
      .pipe(
        tap((chat: IChat) => {
          this.chatList$.next([chat, ...this.chatList$.value]);
          this.currentChat$.next(chat);
        }),
        map((chat: IChat) => chat));
  }

  private removeChatFromList(id) {
    const chatList = [...this.chatList$.value];
    const chatIndex = chatList.findIndex(chat => chat._id === id);
    if (chatIndex > -1) {
      chatList.splice(chatIndex, 1);
      this.chatList$.next([...chatList]);
      this.chatLeave$.next(id);
    }
  }

  public removeChat() {
    const id = this.currentChat$.value._id;
    return this.http.delete(`dialogs/${id}`)
      .pipe(
        tap((chat: IChat) => {
          this.removeChatFromList(chat._id);
        }),
        map((chat: IChat) => chat));
  }

  public addMember(userId: string) {
    const id = this.currentChat$.value._id;
    return this.http.put(`dialogs/${id}/user/${userId}`, {})
      .pipe(
        tap((chat: IChat) => {
          this.onChatUpdate(chat);
        }),
        map((chat: IChat) => chat));
  }

  public removeMember(userId: string) {
    const id = this.currentChat$.value._id;
    return this.http.delete(`dialogs/${id}/user/${userId}`)
      .pipe(
        tap((chat: IChat) => {
          if (userId === this.auth.currentUser._id) {
            this.removeChatFromList(chat._id);
          } else {
            this.onChatUpdate(chat);
          }
        }),
        map((chat: IChat) => chat));
  }

  private onChatUpdate(chat) {
    const chatList = [...this.chatList$.value];
    const chatIndex = chatList.findIndex(item => item._id === chat._id);
    if (chatIndex > -1) {
      chatList[chatIndex] = chat;
      this.chatList$.next([...chatList]);
      if (chat._id === this.currentChat$.value._id) {
        this.currentChat$.next(chat);
      }
    }
  }
}
