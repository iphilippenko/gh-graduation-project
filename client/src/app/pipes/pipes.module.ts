import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveUploadsPipe } from './resolve-uploads.pipe';

@NgModule({
  declarations: [
    ResolveUploadsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResolveUploadsPipe
  ]
})
export class PipesModule { }
