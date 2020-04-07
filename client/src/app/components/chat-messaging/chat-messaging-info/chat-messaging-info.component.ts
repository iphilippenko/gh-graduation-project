import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'chat-messaging-info',
  templateUrl: './chat-messaging-info.component.html',
  styleUrls: ['./chat-messaging-info.component.scss']
})
export class ChatMessagingInfoComponent implements OnInit {
  public showMembersDialog = false;
  public menuShown = false;

  constructor() {
  }

  ngOnInit() {
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

  }

  public showMembers() {
    this.showMembersDialog = true;
    this.menuShown = false;
  }

}
