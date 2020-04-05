import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'chat-messaging-item',
  templateUrl: './chat-messaging-item.component.html',
  styleUrls: ['./chat-messaging-item.component.scss']
})
export class ChatMessagingItemComponent implements OnInit {
  @Input() item;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
