import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusImage' })
export class StatusImagePipe implements PipeTransform {
  transform(v: string, args: any[]) {
    switch (v.toLocaleLowerCase()) {
      case 'open':
        return '../../assets/issue-open.png';
      case 'closed':
        return '../../assets/issue-closed.png';
      default:
        return '';
    }
  }
}
