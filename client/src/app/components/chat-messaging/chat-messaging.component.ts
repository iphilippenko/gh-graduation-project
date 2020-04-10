import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {IMessage} from '../../interfaces/message.interface';
import {IChat} from '../../interfaces/chat.interface';
import {filter, takeUntil} from 'rxjs/operators';
import {CHAT_TYPES} from '../../enums/chat-type.enum';

@Component({
  selector: 'chat-messaging',
  templateUrl: './chat-messaging.component.html',
  styleUrls: ['./chat-messaging.component.scss']
})
export class ChatMessagingComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentUser = this.auth.userInfo$.value;
  public inputEnabled = true;
  public isOwner = true;
  @Input() messages: BehaviorSubject<Array<IMessage>>;
  @Input() chat: BehaviorSubject<IChat>;
  @Output() sendMessage = new EventEmitter();
  @Output() deleteMessage = new EventEmitter();
  @ViewChild('chatList', {static: false}) chatList: ElementRef<HTMLDivElement>;

  private unsubscribeAll = new Subject();

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.chat
      .pipe(
        filter(val => val !== null),
        takeUntil(this.unsubscribeAll)
      ).subscribe(chat => {
      this.inputEnabled = chat.type !== CHAT_TYPES.channel || this.isOwnChannel(chat);
      this.isOwner = this.isOwnChat(chat);
      this.scrollBottom();
    });
  }

  private isOwnChat(chat): boolean {
    return chat.owners.some(owner => owner._id === this.auth.currentUser._id);
  }

  private isOwnChannel(chat): boolean {
    return chat.type === CHAT_TYPES.channel && this.isOwnChat(chat);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    this.scrollBottom();
  }

  private scrollBottom() {
    setTimeout(() => {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight || this.chatList.nativeElement.clientHeight;
    }, 200);
  }

}
