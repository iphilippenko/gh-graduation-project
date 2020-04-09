import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, flatMap, mergeMap, takeUntil} from 'rxjs/operators';
import {ChatService} from '../../services/chat.service';
import {MessageService} from '../../services/message.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private unsubscribeAll = new Subject();

  constructor(public chatService: ChatService,
              public messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.onAuthChange();
    this.listenChatChange();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private onAuthChange() {
    this.authService.authChange$.pipe(
      filter(val => val),
      mergeMap(() => this.chatService.getChatList()),
      takeUntil(this.unsubscribeAll)
    ).subscribe(chats => {
      this.messageService.connect(this.authService.getToken());
      this.listenParamsChange();
    });
  }

  private listenChatChange() {
    this.chatService.currentChat$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter(chat => chat !== null),
        flatMap(chat => this.messageService.getMessages(chat._id))
      )
      .subscribe(() => {
        this.messageService.joinChat(this.chatService.currentChat$.value._id);
      });
  }

  private listenParamsChange() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        if (params.has('id')) {
          this.chatService.findChatById(params.get('id'));
        } else {
          this.router.navigate(['/chat/' + this.chatService.chatList$.value[0]._id]);
        }
      });
  }

  public createChat(chat) {
    this.chatService.createChat(chat)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

  public sendMessage(msg) {
    this.messageService.sendMessage(msg, this.chatService.currentChat$.value._id);
  }

}
