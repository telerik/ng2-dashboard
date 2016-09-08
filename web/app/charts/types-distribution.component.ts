import { Component, Input } from '@angular/core';

@Component({
  selector: 'types-distribution',
  template: `
    <a *ngFor="let button of seriesColors" (click)="onLegendClick($event, button)">{{data[button.label].length}} <span>{{button.label}}</span></a>
    <kendo-chart style="height: 300px; width: 900px" [transitions]="false">
        <kendo-chart-series-defaults type="line" style="smooth" [overlay]="false"></kendo-chart-series-defaults>
        <kendo-chart-category-axis>
            <kendo-chart-category-axis-item
                [crosshair]="{visible: true}"
                baseUnit="months"
                [majorTicks]="{visible: false}"
                [labels]="{step: 4, skip: 2}"
                [majorGridLines]="{visible: false}"
                [line]="{visible: false}"
            ></kendo-chart-category-axis-item>
        </kendo-chart-category-axis>
        <kendo-chart-series>
            <kendo-chart-series-item *ngFor="let series of visibleSeries"
                [data]="series.data"
                [markers]="series.markers"
                [color]="series.color"
                style="smooth"
                aggregate="count"
                categoryField="date"
            ></kendo-chart-series-item>
        </kendo-chart-series>
        <kendo-chart-value-axis>
            <kendo-chart-value-axis-item [line]="{visible: false}" [labels]="{step: 2, skip: 2}" [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
            </kendo-chart-value-axis-item>
        </kendo-chart-value-axis>
    </kendo-chart>
  `
})
export class TypesDistributionComponent {
    @Input() public data;

    private series = [];
    private visibleSeries = [];

    private seriesColors = [
        { label: "SEV: Low", value: "#FF9966" },
        { label: "SEV: Medium", value: "#BB6ACB" },
        { label: "SEV: High", value: "#52C3D3" },
        { label: "Enhancement", value: "#22C85D" },
        { label: "Feature", value: "#FF6358" },
        { label: "Others", value: "#2BA7DA" }
    ]

    public onLegendClick(event, button) {
        const legend = event.target.parentElement;
        const newSeries = {
            color: this.seriesColors.filter(color => color.label === button.label)[0].value,
            markers: { visible: false },
            data: this.data[button.label]
        };

        const present = this.visibleSeries.some(series => series.color === newSeries.color);
        if (present) {
            const removeIndex = this.visibleSeries.map(item => item.color).indexOf(newSeries.color);
            ~removeIndex && this.visibleSeries.splice(removeIndex, 1);
            legend.style.color = "#A2ACAC";
        } else {
            this.visibleSeries.push(newSeries);
            legend.style.color = newSeries.color;
        }
        this.series = this.visibleSeries;
    }
}