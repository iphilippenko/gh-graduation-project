import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {IMessage} from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public chatMessagesList$: BehaviorSubject<Array<IMessage>> = new BehaviorSubject<Array<IMessage>>([]);

  constructor(private http: HttpClient) { }

  public getMessages(dialogId) {
    return this.http.get('messages/' + dialogId)
      .pipe(
        tap((messages: Array<IMessage>) => {
          this.chatMessagesList$.next(messages);
        }),
        map((messages: Array<IMessage>) => messages));
  }
}
