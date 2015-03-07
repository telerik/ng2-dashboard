import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusImage' })
export class StatusImagePipe implements PipeTransform {
  transform(v: string, args: any[]) {
    switch (v.toLocaleLowerCase()) {
      case 'open':
        return 'res://status_open';
      case 'closed':
        return 'res://status_closed';
      default:
        return '';
    }
  }
}
