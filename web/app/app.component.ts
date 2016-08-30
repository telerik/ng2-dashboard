/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: ['.active {color: black; background-color: blue; display: block; width: 100px; height: 23px;}'],
  template: `
    <div>
        <h1>Issues</h1>
        <h4>Sample Dashboard</h4>
          Project
          <ul>
              <li id="dashbaord">
               <a [routerLink]=" ['./dashboard'] " routerLinkActive="active">
                Dashboard</a>
              </li>
              <li id="Issues">
              <a [routerLink]=" ['./issues'] " routerLinkActive="active">
                Issues</a>
              </li>
          </ul>
          Account
          <ul>
              <li id="profile">
               <a [routerLink]=" ['./profile'] " routerLinkActive="active">
                My Profile</a>
              </li>
              <li id="signout">
               <a [routerLink]=" ['./signin'] " routerLinkActive="active">
                Sign Out</a>
              </li>
          </ul>
            <div id="rights">
              <p>Copyright &copy; 2016, Progress Software Corporation and/or its subsidiaries or affiliates.</p>
              <p>All Rights Reserved.</p>
            </div>
      </div>
      <main>
        <router-outlet></router-outlet>
      </main>
  `
})
export class App {
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
