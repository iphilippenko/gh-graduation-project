import {Component, Input, OnInit} from '@angular/core';
import { IChat } from '../../../interfaces/chat.interface';

@Component({
  selector: 'chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent implements OnInit {
  @Input() item: IChat;

  constructor() {
  }

  ngOnInit() {
  }

}
