import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ChatListComponent} from './chat-list.component';
import {ChatListItemComponent} from './chat-list-item/chat-list-item.component';
import { AddChatComponent } from './add-chat/add-chat.component';
import {AddUserModule} from '../add-user/add-user.module';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatListItemComponent,
    AddChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FlexModule,
    SelectButtonModule,
    DialogModule,
    InputTextModule,
    AddUserModule,
  ],
  exports: [
    ChatListComponent,
    ChatListItemComponent,
    AddChatComponent
  ]
})
export class ChatListModule {
}
