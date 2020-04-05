import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ChatMessagingComponent} from './chat-messaging.component';
import {ChatMessagingItemComponent} from './chat-messaging-item/chat-messaging-item.component';
import {ChatMessagingInputComponent} from './chat-messaging-input/chat-messaging-input.component';
import { ChatMessagingInfoComponent } from './chat-messaging-info/chat-messaging-info.component';

@NgModule({
  declarations: [
    ChatMessagingComponent,
    ChatMessagingItemComponent,
    ChatMessagingInputComponent,
    ChatMessagingInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    ScrollPanelModule
  ],
  exports: [
    ChatMessagingComponent,
    ChatMessagingItemComponent,
    ChatMessagingInputComponent,
    ChatMessagingInfoComponent
  ],
})
export class ChatMessagingModule {
}
