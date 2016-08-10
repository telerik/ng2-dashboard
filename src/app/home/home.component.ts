import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { GRID_DIRECTIVES, PagerSettings, ScrollMode, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { MarkdownComponent } from '../markdown/markdown.component';
import { KendoButton, KendoButtonGroup } from '@progress/kendo-angular-buttons'

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
    GRID_DIRECTIVES,
    MarkdownComponent,
    KendoButton,
    KendoButtonGroup
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

  public onButtonClick(e) {
    this.filterByMonth(e);
  }

  public issues: any;
  public view: any;
  public total = 5;
  public pageSize = 5;
  public skip = 0;

  constructor(public appState: AppState, public title: Title, public af: AngularFire) {
    af.database.list('/issues', {
      query: {
        limitToFirst: 10
      }
    }).subscribe(data => this.applyPaging(data));
  }
  onPageChange(e) {
    this.skip = e.skip;
    this.view = this.getView(e.skip, e.take);
  }

  filterByMonth(months) {
    let today = new Date('2016/8/9'); //since the data that we have on the server is since that day

    const end = today.toISOString();
    const start = new Date(today.setMonth(today.getMonth() - months)).toISOString();

    this.af.database.list('/issues', {
      query: {
        orderByChild: 'created_at',
        startAt: start,
        endAt: end
      }
    }).subscribe(data => {
      this.skip = 0;
      this.applyPaging(data);
    })
  }

  applyPaging(data) {
    this.issues = data;
    this.view = this.getView(this.skip, this.pageSize);
  }

  getView(skip, take) {
    return {
      data: this.issues.slice(skip, skip + take),
      total: this.issues.length
    }
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
