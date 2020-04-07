import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ScrollPanel} from 'primeng/scrollpanel';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'chat-messaging',
  templateUrl: './chat-messaging.component.html',
  styleUrls: ['./chat-messaging.component.scss']
})
export class ChatMessagingComponent implements OnInit, AfterViewInit {
  public currentUser = this.auth.userInfo$.value;
  @Input() list = [
    {
      message: 'Hi!',
      author: {_id: ''},
      createdAt: new Date()
    },
    {
      message: 'Hru?',
      author: {_id: ''},
      createdAt: new Date()
    },
    {
      message: 'Hi!',
      author: {_id: ''},
      createdAt: new Date()
    },
    {
      message: 'testing',
      author: {_id: this.currentUser && this.currentUser._id},
      createdAt: new Date()
    },
    {
      message: 'eyeye!',
      author: {_id: ''},
      createdAt: new Date()
    },
    {
      message: '!!!!',
      author: {_id: this.currentUser && this.currentUser._id},
      createdAt: new Date()
    },
    {
      message: 'lorem ipsum, lorem ipsum. lorem ipsum, lorem ipsum.',
      author: {_id: this.currentUser && this.currentUser._id},
      createdAt: new Date()
    }
  ];
  @ViewChild('chatList', {static: false}) chatList: ElementRef<HTMLDivElement>;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.clientHeight;
    });
  }

}
