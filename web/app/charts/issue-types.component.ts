import { Component, Input } from '@angular/core';

@Component({
  selector: 'issue-types',
  template: `
    Issue Types
    <kendo-chart>
        <kendo-chart-series>
            <kendo-chart-series-item [holeSize]="100" (seriesHover)="onHover()" [data]="data" type="donut" field="value" categoryField="type" [overlay]="false"></kendo-chart-series-item>
        </kendo-chart-series>
    </kendo-chart>
  `
})
export class IssueTypesComponent {
    @Input() public data;

    public onHover() {
        console.log(arguments);
    }
}