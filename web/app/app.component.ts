import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require("./app.style.scss").toString()
    ],
    template: `
        <div class="row">
            <div id="nav" class="col-xs-3 bg-inverse p-y-2 k-vbox" *ngIf="showNav()">
                <h1 id="app-title">Issues</h1>
                <p id="app-subtitle">Sample Dashboard</p>
                <hr />
                <p class="h4">Project</p>
                <ul class="nav nav-pills nav-stacked">
                    <li class="nav-item" id="dashbaord">
                        <a [routerLink]=" ['./dashboard'] " class="nav-link" routerLinkActive="active">Dashboard</a>
                    </li>
                    <li class="nav-item" id="issues">
                        <a [routerLink]=" ['./issues'] " class="nav-link" routerLinkActive="active">Issues</a>
                    </li>
                </ul>
                <hr />
                <p class="h4">Account</p>
                <ul class="nav nav-pills nav-stacked">
                    <li class="nav-item" id="profile">
                        <a [routerLink]=" ['./profile'] " class="nav-link" routerLinkActive="active">My Profile</a>
                    </li>
                    <li class="nav-item" id="signout">
                        <a [routerLink]=" ['./signin'] " class="nav-link" routerLinkActive="active">Sign Out</a>
                    </li>
                </ul>
                <hr class="k-flex" />
                <div id="copy">
                    <p>Copyright &copy; 2016, <a href="http://www.progress.com">Progress Software Corporation</a> and/or its subsidiaries or affiliates.</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>
            <main class="col-xs p-a-2">
                <router-outlet></router-outlet>
            </main>
        </div>
    `
})
export class App {
    constructor(private router: Router) {}

    @HostBinding('attr.id') protected get id(): string {
        return 'app';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'app container-fluid'
    }

    private showNav() {
        return this.router.url === '/signin' ? false : true;
    }
}