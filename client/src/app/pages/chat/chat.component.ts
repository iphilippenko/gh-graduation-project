import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private unsubscribeAll = new Subject();

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
    this.getChatList();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public getChatList() {
    this.chatService.getChatList()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

  public createChat(chat) {
    this.chatService.createChat(chat)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

}
