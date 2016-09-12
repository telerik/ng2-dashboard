import { Component, Input } from '@angular/core';

@Component({
  selector: 'active-issues',
  template: `
    <div class="k-hbox">

        <div>
            Active issues
            <kendo-chart renderAs="canvas" style="height: 80px; width: 300px">
                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="2" [overlay]="false"></kendo-chart-series-defaults>
                <kendo-chart-series>
                    <kendo-chart-series-item [color]="'#888'" [data]="active" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                </kendo-chart-series>
                <kendo-chart-category-axis>
                    <kendo-chart-category-axis-item
                        [baseUnit]="baseUnit"
                        [majorTicks]="{visible: false}"
                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                        [majorGridLines]="{visible: false}"
                        [line]="{visible: false}"
                    ></kendo-chart-category-axis-item>
                </kendo-chart-category-axis>
                <kendo-chart-value-axis>
                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                    </kendo-chart-value-axis-item>
                </kendo-chart-value-axis>
            </kendo-chart>
        </div>

        <div>
            Closed issues
            <kendo-chart renderAs="canvas" style="height: 80px; width: 300px">
                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="2" [overlay]="false"></kendo-chart-series-defaults>
                <kendo-chart-series>
                    <kendo-chart-series-item [color]="'#35C473'" [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                </kendo-chart-series>
                <kendo-chart-category-axis>
                    <kendo-chart-category-axis-item
                        [baseUnit]="baseUnit"
                        [majorTicks]="{visible: false}"
                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                        [majorGridLines]="{visible: false}"
                        [line]="{visible: false}"
                    ></kendo-chart-category-axis-item>
                </kendo-chart-category-axis>
                <kendo-chart-value-axis>
                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                    </kendo-chart-value-axis-item>
                </kendo-chart-value-axis>
            </kendo-chart>
        </div>

        <div>
            Open issues
            <kendo-chart renderAs="canvas" style="height: 80px; width: 300px">
                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="2" [overlay]="false"></kendo-chart-series-defaults>
                <kendo-chart-series>
                    <kendo-chart-series-item [color]="'#CC3458'" [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                </kendo-chart-series>
                <kendo-chart-category-axis>
                    <kendo-chart-category-axis-item
                        [baseUnit]="baseUnit"
                        [majorTicks]="{visible: false}"
                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                        [majorGridLines]="{visible: false}"
                        [line]="{visible: false}"
                    ></kendo-chart-category-axis-item>
                </kendo-chart-category-axis>
                <kendo-chart-value-axis>
                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                    </kendo-chart-value-axis-item>
                </kendo-chart-value-axis>
            </kendo-chart>
        </div>

        <div>
            Close rate
            <kendo-chart style="height: 20px; width: 300px" [chartArea]="{margin: -20}">
                <kendo-chart-series>
                    <kendo-chart-series-item type="bullet"
                        [data]="bulletData"
                        [target]="{color: '#FFF'}"
                        currentField="current"
                        targetField="target"
                        color="#CC3458"
                    ></kendo-chart-series-item>
                </kendo-chart-series>
                <kendo-chart-value-axis>
                    <kendo-chart-value-axis-item
                        [plotBands]="[{from:0, to:100, color: '#35C473'}]"
                        [visible]="false"
                        [majorGridLines]="{visible: false}">
                    </kendo-chart-value-axis-item>
                </kendo-chart-value-axis>
            </kendo-chart>
        </div>

    </div>


        <h3>All issues</h3>
        <kendo-chart renderAs="canvas">
            <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.06" [overlay]="false"></kendo-chart-series-defaults>
            <kendo-chart-series>
                <kendo-chart-series-item [opacity]="0.3" [border]="{color: '#35C473', opacity: 0.3}" [color]="'#35C473'" [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                <kendo-chart-series-item [opacity]="0.3" [border]="{color: '#CC3458', opacity: 0.3}" [color]="'#CC3458'" [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-category-axis>
                <kendo-chart-category-axis-item
                    [baseUnit]="baseUnit"
                    [majorTicks]="{visible: false}"
                    [line]="{visible: false}"
                    [majorGridLines]="{visible: false}"
                    [labels]="{rotation: 'auto', margin: { top: 8 }}"
                ></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
            <kendo-chart-value-axis>
                <kendo-chart-value-axis-item [line]="{visible: false}" [labels]="{step: 2, skip: 2, margin: { right: 4 }}" [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
                </kendo-chart-value-axis-item>
            </kendo-chart-value-axis>
        </kendo-chart>
  `
})
export class ActiveIssuesComponent {
    private baseUnit;
    private bulletData;
    @Input() public data;
    @Input() public active;
    @Input() public set months(months) {
        months > 3 ? this.baseUnit = 'months' : this.baseUnit = 'weeks';
    }

    @Input() public set closeRate(rate) {
        this.bulletData = [{target: 70, current: Math.round(rate * 100)}]
    };
}



