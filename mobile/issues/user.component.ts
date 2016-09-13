import { Component, Input} from '@angular/core';
import { User } from '../../shared/issues.model';

@Component({
  selector: 'ns-user',
  styles: [require("../app.scss").toString()],
  template: `
    <StackLayout orientation="horizontal">
      <Image [src]="user?.avatarUrl" class="avatar-big"></Image>
      <Label [text]="user?.name" class="username"></Label>
    </StackLayout>
  `
})
export class UserComponent {
  @Input() user: User;
}