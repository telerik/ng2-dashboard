import { Component, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  encapsulation: ViewEncapsulation.None,
  styles: [
      require("../app.style.scss").toString()
  ],
  templateUrl: './signin.template.html'
})
export class Signin {

  constructor(private router: Router) {}
  public onLoginClick() {
    this.router.navigate(['/dashboard']);
  }
}
