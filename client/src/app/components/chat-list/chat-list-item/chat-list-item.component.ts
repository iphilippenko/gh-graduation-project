import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent implements OnInit {
  @Input() item = {
    img: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    name: 'TEst chat',
    updatedAt: new Date()
  };

  constructor() {
  }

  ngOnInit() {
  }

}
