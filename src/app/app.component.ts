/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { AppState } from './app.service';
import { GRID_DIRECTIVES, PagerSettings, ScrollMode, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Rx';
import { ProductsService } from './common/northwind.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [ ProductsService ],
  styles: [
        require("./app.style.scss").toString()
  ],
  directives: [GRID_DIRECTIVES],
  template: `
  <div class="row row-offcanvas row-offcanvas-left">
    <div id="nav-section" class="col-xs-12 column">
        <div class="navbar-default">
          <button id="toggle-button" type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
        </div>
        <h1 id="dash-logo" class="center-block">Northwind&#183;Dash</h1>
        <div class="collapse navbar-collapse" id="sidebar-nav" role="navigation">
          <ul class="nav">
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
          </div>
        </div>
      <div id="main-section" class="col-xs-12 column" ng-viewport></div>
    </div>

    <kendo-grid [scrollable]="scrollable"
          [data]="view | async"
          [total]="total"
          [pageSize]="pageSize"
          [rowHeight]="37"
          [detailRowHeight]="75"
          [skip]="skip"
          [sortable]="true"
          [sort]="sort"
          [pageable]="pagerOptions"
        >
        <kendo-grid-column field="ProductName" [locked]="true" width="300">
            <template kendoHeaderTemplate>
                template
            </template>
            <template kendoCellTemplate let-dataItem>
                <input type="checkbox"
                    [checked]="dataItem.Discontinued"
                    (change)="dataItem.Discontinued = !dataItem.Discontinued"/>
                {{dataItem.Discontinued}}
            </template>
        </kendo-grid-column>
        <kendo-grid-column field="ProductID" title="ProductID" width="200" [locked]="true">
        </kendo-grid-column>

        <kendo-grid-column field="ProductName" title="Product Name" width="400">
        </kendo-grid-column>

        <kendo-grid-column field="ProductID" title="foo" width="400">
            <!--template [ngIf]="show">
            <template  kendoCellTemplate let-dataItem let-column="column">
              for field "{{column.field}}", the value is "{{dataItem.idx}}"
            </template>
            </template-->
            <!--
            <div *kendoCellTemplate="let dataItem = dataItem; let column = column;">
              for field "{{column.field}}", the value is "{{dataItem.idx}}"
            </div>
            -->
        </kendo-grid-column>
      </kendo-grid>
    <main class="col-sm-4">
      <router-outlet></router-outlet>
    </main>

  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor(public appState: AppState, private service: ProductsService) {
      this.view = service.load();
  }
  private sort = [];
  private view: Observable<GridDataResult>;
  private scrollable: ScrollMode = 'scrollable';

  private pagerOptions: PagerSettings = {
      input: true,
      buttonCount: 4,
      previousNext: true,
      pageSizes: [3, 5, 4]
  }
  @ViewChild(GridComponent) grid: GridComponent;
  ngAfterViewInit() {
        this.grid.pageChange
            .merge(this.grid.sortChange.map(x => ({ sort: x })))
            .scan((acc, one) => Object.assign({}, acc, one), {
                skip: this.skip,
                take: this.pageSize,
                sort: this.sort
            })
            .do(({ skip, take, sort }: any) => {
                this.skip = skip;
                this.pageSize = take;
                this.sort = sort;
            })
            .subscribe(x => this.service.query(x));
    }
    total = 100;
    pageSize = 10;
    skip = 0;

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
