import { Component, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
    selector: 'signin',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './signin.template.html'
})
export class SigninComponent {
    constructor(private router: Router) {}

    public onLoginClick() {
        this.router.navigate(['/dashboard']);
    }
}


@NgModule({
    declarations: [SigninComponent],
    imports: [CommonModule]
})

export class SigninModule {}