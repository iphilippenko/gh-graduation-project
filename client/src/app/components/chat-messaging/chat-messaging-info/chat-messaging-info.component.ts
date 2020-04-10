import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IChat} from '../../../interfaces/chat.interface';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {ChatService} from '../../../services/chat.service';

@Component({
  selector: 'chat-messaging-info',
  templateUrl: './chat-messaging-info.component.html',
  styleUrls: ['./chat-messaging-info.component.scss']
})
export class ChatMessagingInfoComponent implements OnInit, OnDestroy {
  @Input() chat: IChat;
  @Input() isOwner: boolean;
  public showMembersDialog = false;
  public menuShown = false;
  private unsubscribeAll = new Subject();

  constructor(public auth: AuthService, private chatService: ChatService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public show() {
    this.menuShown = true;
  }

  public hide() {
    this.menuShown = false;
  }

  public toggle() {
    this.menuShown = !this.menuShown;
  }

  public leave() {
    this.chatService.removeMember(this.auth.currentUser._id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.menuShown = false;
      });
  }

  public delete() {
    this.chatService.removeChat()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.menuShown = false;
      });
  }

  public showMembers() {
    this.showMembersDialog = true;
    this.menuShown = false;
  }

}
