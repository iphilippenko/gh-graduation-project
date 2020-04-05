import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {LayoutModule} from '../../components/layout/layout.module';
import {ChatListModule} from '../../components/chat-list/chat-list.module';
import {ChatMessagingModule} from "../../components/chat-messaging/chat-messaging.module";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChatRoutingModule,
    LayoutModule,
    ChatListModule,
    ChatMessagingModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {
}
