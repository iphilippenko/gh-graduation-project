import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {IMessage} from '../../interfaces/message.interface';
import {IChat} from '../../interfaces/chat.interface';
import {takeUntil} from "rxjs/operators";
import {CHAT_TYPES} from "../../enums/chat-type.enum";

@Component({
  selector: 'chat-messaging',
  templateUrl: './chat-messaging.component.html',
  styleUrls: ['./chat-messaging.component.scss']
})
export class ChatMessagingComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentUser = this.auth.userInfo$.value;
  public inputEnabled = true;
  @Input() messages: BehaviorSubject<Array<IMessage>>;
  @Input() chat: BehaviorSubject<IChat>;
  @ViewChild('chatList', {static: false}) chatList: ElementRef<HTMLDivElement>;

  private unsubscribeAll = new Subject();

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.chat.pipe(takeUntil(this.unsubscribeAll)).subscribe(chat => {
      this.inputEnabled = chat.type !== CHAT_TYPES.channel || this.isOwnChannel(chat);
    });
  }

  private isOwnChannel(chat): boolean {
    return chat.type === CHAT_TYPES.channel && chat.owners.includes(this.auth.currentUser._id);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.clientHeight;
    });
  }

}
