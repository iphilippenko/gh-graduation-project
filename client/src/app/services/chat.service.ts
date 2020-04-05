import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IChat} from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatList$: BehaviorSubject<Array<IChat>> = new BehaviorSubject<Array<IChat>>([]);

  constructor(private http: HttpClient) {
  }

  public getChatList() {
    return this.http.get('chat-list')
      .pipe(
        tap((chats: Array<IChat>) => {
          this.chatList$.next(chats);
        }),
        map((chats: Array<IChat>) => chats));
  }

  public createChat(data): Observable<IChat> {
    return this.http.post('chat', data)
      .pipe(
        tap((chat: IChat) => {
          this.chatList$.next([chat, ...this.chatList$.value]);
        }),
        map((chat: IChat) => chat));
  }
}
