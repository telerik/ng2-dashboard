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
  template: `
        <h1>Issues</h1>
        <h4>Sample Dashboard</h4>
          <ul>
              <li id="regional-sales-status">
               <a [routerLink]=" ['./sales'] ">
                <span class="icon icon-chart-column"></span>Regional Sales Status</a>
              </li>
              <li id="products-and-orders">
              <a [routerLink]=" ['./orders'] ">
                <span class="icon icon-star-empty"></span>Products &amp; Orders</a>
              </li>
              <li id="team-efficiency">
              <a  [routerLink]=" ['./efficiency'] ">
                <span class="icon icon-faves"></span>Team Efficiency</a>
              </li>
              <li id="about">
              <a  [routerLink]=" ['./about'] ">
                <span class="icon icon-info"></span>About</a>
              </li>
            </ul>
            <div id="rights">
              <p>Copyright &copy; 2016, Progress Software Corporation and/or its subsidiaries or affiliates. All Rights Reserved.</p>
            </div>
    <main>
      <router-outlet></router-outlet>
    </main>

  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor(public appState: AppState) {
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
