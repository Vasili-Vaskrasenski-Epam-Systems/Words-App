import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enum-to-array-pipe'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}
