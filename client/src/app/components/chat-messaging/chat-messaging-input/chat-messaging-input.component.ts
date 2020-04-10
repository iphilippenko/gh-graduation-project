import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import {MessageService} from '../../../services/message.service';
import {IUser} from '../../../interfaces/user.interface';

@Component({
  selector: 'chat-messaging-input',
  templateUrl: './chat-messaging-input.component.html',
  styleUrls: ['./chat-messaging-input.component.scss']
})
export class ChatMessagingInputComponent implements OnInit, OnDestroy {
  body: string;
  modelChanged: Subject<string> = new Subject<string>();
  typingMember: IUser | null = null;
  @Output() sendMessage = new EventEmitter();

  private unsubscribeAll = new Subject();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.somebodyTyping$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(person => this.typingMember = person);
    this.modelChanged
      .pipe(
        tap(() => this.messageService.setUserTyping(true)),
        debounceTime(1000),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(() => this.messageService.setUserTyping(false));
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  send() {
    this.sendMessage.emit(this.body);
    this.body = '';
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }

}
