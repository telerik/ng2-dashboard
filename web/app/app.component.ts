import { Component, ViewEncapsulation, HostBinding, HostListener, ViewChild, animate, state, style, transition, trigger } from '@angular/core';
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
            <div id="top-bar" class="top-bar col-xs-12 bg-inverse hidden-md-up"></div>
            <div id="nav" class="col-xs-3 bg-inverse p-y-3 k-vbox"
                [@toggleNav]="navState" *ngIf="showNav()">
                <span id="nav-toggle" class="nav-toggle hidden-md-up"
                    (click)="toggleNav()">
                    <span class="k-icon k-i-hamburger"></span>
                </span>
                <h1 id="app-title">Issues</h1>
                <p id="app-subtitle">Sample Dashboard</p>
                <hr />
                <p class="h4 m-t-3">Project</p>
                <ul class="nav nav-pills nav-stacked">
                    <li class="nav-item" id="dashbaord">
                        <a [routerLink]=" ['./dashboard'] " class="nav-link" routerLinkActive="active">Dashboard</a>
                    </li>
                    <li class="nav-item" id="issues">
                        <a [routerLink]=" ['./issues'] " class="nav-link" routerLinkActive="active">Issues</a>
                    </li>
                </ul>
                <p class="h4 m-t-3">Account</p>
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
                    <p>Copyright &copy; {{year}},<br /><a href="http://www.progress.com">Progress Software Corporation</a> and/or its subsidiaries or affiliates.</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>
            <main class="col-xs p-a-2">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    animations: [trigger(
        'toggleNav',
        [
            state( 'collapsed, void', style({transform: 'translateX(-100%)'}) ),
            state( 'expanded', style({transform: 'translateX(0)'}) ),
            transition( 'collapsed <=> expanded',
                [
                    animate( 200 ),
                    animate( 200 )
                ]
            )
        ]
    )]
})
export class App {
    private year = new Date().getFullYear();
    private navState: string;
    constructor(private router: Router) {
        if ( window.innerWidth < 768 ) {
            this.navState = 'collapsed';
        }
        else {
            this.navState = 'expanded';
        }
    }

    @HostBinding('attr.id') protected get id(): string {
        return 'app';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'app container-fluid';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if ( event.target.innerWidth < 768 ) {
            this.navState = 'collapsed';
        }
        else {
            this.navState = 'expanded';
        }
    }

    private showNav() {
        return this.router.url === '/signin' ? false : true;
    }

    private toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed'
        }
        else {
            this.navState = 'expanded'
        }
    }
}