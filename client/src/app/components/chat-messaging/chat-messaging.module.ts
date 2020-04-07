import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatMessagingComponent} from './chat-messaging.component';
import {ChatMessagingItemComponent} from './chat-messaging-item/chat-messaging-item.component';
import {ChatMessagingInputComponent} from './chat-messaging-input/chat-messaging-input.component';
import {ChatMessagingInfoComponent} from './chat-messaging-info/chat-messaging-info.component';
import {MembersListComponent} from './members-list/members-list.component';
import {DialogModule} from 'primeng/dialog';
import {AddUserModule} from '../add-user/add-user.module';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    ChatMessagingComponent,
    ChatMessagingItemComponent,
    ChatMessagingInputComponent,
    ChatMessagingInfoComponent,
    MembersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    DialogModule,
    AddUserModule,
    ButtonModule
  ],
  exports: [
    ChatMessagingComponent,
    ChatMessagingItemComponent,
    ChatMessagingInputComponent,
    ChatMessagingInfoComponent,
    MembersListComponent
  ],
})
export class ChatMessagingModule {
}
