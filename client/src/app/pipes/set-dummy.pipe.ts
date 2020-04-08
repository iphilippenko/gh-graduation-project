import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setDummy'
})
export class SetDummyPipe implements PipeTransform {

  transform(value?: string): any {
    return value || '/assets/img/dummy-profile.png';
  }

}
