import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'chat-messaging-input',
  templateUrl: './chat-messaging-input.component.html',
  styleUrls: ['./chat-messaging-input.component.scss']
})
export class ChatMessagingInputComponent implements OnInit {
  body: string;
  @Output() sendMessage = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  send() {
    this.sendMessage.emit(this.body);
    this.body = '';
  }

}
