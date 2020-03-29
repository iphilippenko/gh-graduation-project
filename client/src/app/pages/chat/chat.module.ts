import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChatRoutingModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {
}
