import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {LayoutComponent} from './layout.component';
import {HeaderModule} from '../header/header.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FlexLayoutModule,
    ScrollPanelModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
