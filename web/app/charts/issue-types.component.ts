import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'issue-types',
    template: `
        <div class="card issue-types">
            <h4 class="card-header">Issue Types</h4>
            <div class="card-block" style="margin: auto;">
                <kendo-chart (seriesHover)="onHover($event)">
                    <kendo-chart-series>
                        <kendo-chart-series-item
                            [holeSize]="100"
                            [data]="issues"
                            type="donut"
                            field="value"
                            categoryField="type"
                            [overlay]="false"
                        ></kendo-chart-series-item>
                    </kendo-chart-series>
                    <kendo-chart-legend [labels]="{font: '0.65em Roboto, Arial, sans-serif'}">
                    </kendo-chart-legend>
                </kendo-chart>
                <div class="comp-label chart-label" [style.color]="hoverColor">
                    <strong>{{donutPercent}}</strong>
                    <small>{{donutLabel}}</small>
                </div>
            </div>
        </div>
    `
})
export class IssueTypesComponent {
    public donutPercent: string;
    public donutLabel: string;
    public issues;
    public hoverColor: string = 'rgb(170, 70, 190)';

    @Input() public set data(data) {
        this.issues = data;
        data.forEach(series =>  {
            if (series.type === 'OTHER') {
                this.setDonutLegend({
                    value: series.value,
                    category: series.type,
                    point: {
                        options: {
                            color: this.hoverColor
                        }
                    }
                });
            }
        })
    };

    public onHover(event) {
        this.setDonutLegend(event);
    }

    private setDonutLegend(series) {
        this.hoverColor = series.point.options.color;
        this.donutPercent = Math.round(series.value * 100) + '%';
        this.donutLabel = series.category;
    }
}