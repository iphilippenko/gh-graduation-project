import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IChat} from '../interfaces/chat.interface';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatList$: BehaviorSubject<Array<IChat>> = new BehaviorSubject<Array<IChat>>([]);
  public currentChat$: BehaviorSubject<IChat | null> = new BehaviorSubject<IChat | null>(null);

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public findChatById(id: string) {
    const chat = this.chatList$.value.find(item => item._id === id);
    if (chat) {
      this.currentChat$.next(chat);
      return;
    }
    this.getChatById(id).subscribe();
  }

  public getChatById(id: string) {
    return this.http.get('dialogs/' + id)
      .pipe(
        tap((chat: IChat) => {
          this.currentChat$.next(chat);
        }),
        map((chat: IChat) => chat));
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

    return this.http.post('dialogs', data)
      .pipe(
        tap((chat: IChat) => {
          this.chatList$.next([chat, ...this.chatList$.value]);
        }),
        map((chat: IChat) => chat));
  }
}
