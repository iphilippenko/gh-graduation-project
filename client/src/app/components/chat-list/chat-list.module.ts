import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {FlexModule} from '@angular/flex-layout';
import {ChatListComponent} from './chat-list.component';
import {ChatListItemComponent} from './chat-list-item/chat-list-item.component';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatListItemComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FlexModule
  ],
  exports: [
    ChatListComponent,
    ChatListItemComponent
  ]
})
export class ChatListModule {
}
