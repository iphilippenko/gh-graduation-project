import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {LayoutModule} from '../../components/layout/layout.module';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChatRoutingModule,
    LayoutModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {
}
