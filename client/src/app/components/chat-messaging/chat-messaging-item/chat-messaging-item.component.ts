import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {IMessage} from '../../../interfaces/message.interface';

@Component({
  selector: 'chat-messaging-item',
  templateUrl: './chat-messaging-item.component.html',
  styleUrls: ['./chat-messaging-item.component.scss']
})
export class ChatMessagingItemComponent implements OnInit {
  @Input() item: IMessage;
  @Output() delete = new EventEmitter();

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
