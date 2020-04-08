import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, flatMap, takeUntil} from 'rxjs/operators';
import {ChatService} from '../../services/chat.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private unsubscribeAll = new Subject();

  constructor(public chatService: ChatService,
              public messageService: MessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.listenChatChange();
    this.listenParamsChange();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private listenChatChange() {
    this.chatService.currentChat$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(chat => chat !== null),
        flatMap(chat => this.messageService.getMessages(chat._id))
      )
      .subscribe();
  }

  private listenParamsChange() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        if (params.has('id')) {
          this.chatService.findChatById(params.get('id'));
        }
      });
  }

  public createChat(chat) {
    this.chatService.createChat(chat)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

}
