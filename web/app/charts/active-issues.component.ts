import { Component, Input } from '@angular/core';
import { CHART_DIRECTIVES } from '@progress/kendo-angular-charts/dist/npm/js/main';

@Component({
  selector: 'active-issues',
  styles: [
      require("../app.style.scss").toString()
  ],
  template: `
  <h3>All issues</h3>
        <kendo-chart renderAs="canvas">
            <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.02" [overlay]="false"></kendo-chart-series-defaults>
            <kendo-chart-series>
                <kendo-chart-series-item [data]="active" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-category-axis>
                <kendo-chart-category-axis-item baseUnit="months" [labels]="{rotation: 'auto'}"></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
    </kendo-chart>
  <h3>Closed issues</h3>
        <kendo-chart renderAs="canvas">
            <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0" [overlay]="false"></kendo-chart-series-defaults>
            <kendo-chart-series>
                <kendo-chart-series-item [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-category-axis>
                <kendo-chart-category-axis-item baseUnit="months" [labels]="{rotation: 'auto'}"></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
    </kendo-chart>
    <h3>Open issues</h3>
        <kendo-chart renderAs="canvas">
            <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0" [overlay]="false"></kendo-chart-series-defaults>
            <kendo-chart-series>
                <kendo-chart-series-item [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-category-axis>
                <kendo-chart-category-axis-item baseUnit="months" [labels]="{rotation: 'auto'}"></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
    </kendo-chart>
    <h3>All issues</h3>
    <kendo-chart renderAs="canvas">
        <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0" [overlay]="false"></kendo-chart-series-defaults>
        <kendo-chart-series>
            <kendo-chart-series-item [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            <kendo-chart-series-item [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
        </kendo-chart-series>
        <kendo-chart-category-axis>
            <kendo-chart-category-axis-item baseUnit="months" [labels]="{rotation: 'auto'}"></kendo-chart-category-axis-item>
        </kendo-chart-category-axis>
    </kendo-chart>
  `
})
export class ActiveIssuesComponent {
    @Input() public data;
    @Input() public active;
}