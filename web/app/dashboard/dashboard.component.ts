import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [
      require("../app.style.scss").toString()
  ],
  templateUrl: './dashboard.template.html'
})
export class Dashboard {
}
