import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IChat} from '../../interfaces/chat.interface';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Input() items: BehaviorSubject<Array<IChat>>;
  showAddDialog = false;

  constructor() {
  }

  ngOnInit() {
  }

}
