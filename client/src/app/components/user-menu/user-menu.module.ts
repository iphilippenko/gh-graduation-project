import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {UserMenuComponent} from './user-menu.component';
import {ImageUploadModule} from '../image-upload/image-upload.module';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    ImageUploadModule,
    PipesModule,
    ButtonModule,
    RouterModule
  ],
  exports: [UserMenuComponent]
})
export class UserMenuModule {
}
