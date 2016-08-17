import { Component, Input } from '@angular/core';
import { CHART_DIRECTIVES } from '@progress/kendo-angular-charts/dist/npm/js/main';

@Component({
  selector: 'types-distribution',
  directives: [CHART_DIRECTIVES],
  styles: [
      require("../app.style.scss").toString()
  ],
  template: `
<kendo-chart>
    <kendo-chart-series-defaults type="area"></kendo-chart-series-defaults>
    <kendo-chart-category-axis>
        <kendo-chart-category-axis-item [majorGridLines]="false" [crosshair]="{visible: true}" baseUnit="months" >
        </kendo-chart-category-axis-item>
    </kendo-chart-category-axis>
    <kendo-chart-series>
        <kendo-chart-series-item [data]="data.Others" categoryField="date" [overlay]="false" aggregate="count" [line]="{ style: 'smooth', visible: true, width: 2 }">
        </kendo-chart-series-item>
        <kendo-chart-series-item [data]="data.Enhancement" categoryField="date" [overlay]="false" aggregate="count" [line]="{ style: 'smooth',  visible: true, width: 2 }">
        </kendo-chart-series-item>
        <kendo-chart-series-item [data]="data['SEV: Low']" categoryField="date" [overlay]="false" aggregate="count" [line]="{ style: 'smooth',  visible: true, width: 2 }">
        </kendo-chart-series-item>
    </kendo-chart-series>
</kendo-chart>
  `
})
export class TypesDistributionComponent {
    @Input() public data;
}