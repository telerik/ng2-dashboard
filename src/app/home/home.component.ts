import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { GRID_DIRECTIVES, PagerSettings, ScrollMode, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  styles: [
      require("../app.style.scss").toString()
  ],
  directives: [
    XLarge,
    GRID_DIRECTIVES
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home {
  public value: number = 5;
  public min: number = 0;
  public max: number = 10;
  public smallStep: number = 1;
  public checked: boolean = false;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers

  public onValueChange(value) {
      this.value = value;
      this.checked = !this.checked;

  }
  public orders: FirebaseListObservable<any[]>;
  constructor(public appState: AppState, public title: Title, public firebase: AngularFire) {
    this.orders = firebase.database.list('/issues', {
      query: {
        limitToFirst: 5
      }
    })
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
