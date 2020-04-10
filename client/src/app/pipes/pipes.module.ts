import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveUploadsPipe } from './resolve-uploads.pipe';
import { SetDummyPipe } from './set-dummy.pipe';

@NgModule({
  declarations: [
    ResolveUploadsPipe,
    SetDummyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResolveUploadsPipe,
    SetDummyPipe
  ]
})
export class PipesModule { }
