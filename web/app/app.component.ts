import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div id="nav">
        <h1>Issues</h1>
        <h4>Sample Dashboard</h4>
        Project
        <ul>
            <li id="dashbaord">
             <a [routerLink]=" ['./dashboard'] " routerLinkActive="active-link">
              Dashboard</a>
            </li>
            <li id="issues">
            <a [routerLink]=" ['./issues'] " routerLinkActive="active-link">
              Issues</a>
            </li>
        </ul>
        Account
        <ul>
            <li id="profile">
             <a [routerLink]=" ['./profile'] " routerLinkActive="active-link">
              My Profile</a>
            </li>
            <li id="signout">
             <a [routerLink]=" ['./signin'] " routerLinkActive="active-link">
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
export class App {}