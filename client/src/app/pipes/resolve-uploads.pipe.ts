import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'resolveUploads'
})
export class ResolveUploadsPipe implements PipeTransform {

  transform(value: string | null, ...args: any[]): any {
    return value ? `${environment.fileUrl}${value}` : value;
  }

}
