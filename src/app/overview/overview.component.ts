import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CHART_DIRECTIVES } from '@progress/kendo-angular-charts/dist/npm/js/main';
import { TABSTRIP_DIRECTIVES } from '@progress/kendo-angular-layout';
import { GithubService } from '../common/github.service'
import { KendoButton, KendoButtonGroup } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'overview',
  directives: [CHART_DIRECTIVES, KendoButton, KendoButtonGroup, TABSTRIP_DIRECTIVES],
  providers: [GithubService],
   styles: [
      require("../app.style.scss").toString()
  ],
  template: `
    <span>{{ rangeStart | date }} - {{ today | date }}</span>
    <kendo-button-group [selection]="'single'">
      <button kendoButton (click)="onFilterClick(1)" [togglable]="true">1 Month</button>
      <button kendoButton (click)="onFilterClick(6)" [togglable]="true">6 Months</button>
      <button kendoButton (click)="onFilterClick(12)" [togglable]="true">1 Year</button>
    </kendo-button-group>
    <kendo-tabstrip>
       <kendo-tabstrip-tab [title]="'All Issues'" [selected]="true">
          Active Issues = {{ issues.open.length + issues.closed.length }}
          Open Issues = {{issues.open.length}}
          Closed Issues = {{issues.closed.length}}
          Close rate = {{issues.closed.length / (issues.open.length + issues.closed.length) | percent:'2.0-0' }}
          Highest close rate {{closeRate.highest.close_rate | percent }} on {{closeRate.highest.created_at | date}}
          Lowest close rate {{closeRate.lowest.close_rate | percent }} on {{closeRate.lowest.created_at | date}}
          <kendo-chart>
            <kendo-chart-series>
              <kendo-chart-series-item [data]="issues.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
            </kendo-chart-series>
            <kendo-chart-category-axis>
              <kendo-chart-category-axis-item baseUnit="fit" [labels]="{rotation: 'auto'}"></kendo-chart-category-axis-item>
            </kendo-chart-category-axis>
            <kendo-chart-zoomable [mousewheel]="{ lock: 'y' }"></kendo-chart-zoomable>
            <kendo-chart-pannable [mousewheel]="{ lock: 'y' }"></kendo-chart-pannable>
            <kendo-chart-title text="Foo Bar"></kendo-chart-title>
          </kendo-chart>
       </kendo-tabstrip-tab>

       <kendo-tabstrip-tab [title]="'Assigned to Me'">
        Mine
       </kendo-tabstrip-tab>

       <kendo-tabstrip-tab [title]="'Created by Me'">
        Created
       </kendo-tabstrip-tab>
    </kendo-tabstrip>
  `
})
export class Overview {
  issues: any = { open: [], closed: [] };
  issueTypes: any;
  typeDistribution: any;
  closeRate: any = {highest: {}, lowest: {}};
  today: Date = new Date();
  rangeStart: Date = this.githubService.getMonthsRange(1);
  constructor(public githubService: GithubService) {
    githubService.getGithubIssues({pages: 3}).subscribe((data: any[]) => {
      data = data
          .reduce((agg, curr) => [...agg, ...curr], [])
          .filter(issue => !issue.pull_request)
          .map((item: any) => ({
            state: item.state,
            date: new Date(item.created_at),
            count: 1,
            labels: item.labels,
            created_at: item.created_at
          }));
      this.issueTypes = this.groupLabels(data);
      this.typeDistribution = this.distribution(data);
      this.issues = data.reduce((agg, curr) => {
        agg[curr.state].push(curr);
        return agg
      }, { open: [], closed: [] });
      this.closeRate = this.closeRatePerDay(this.issues);
    })
  }

  onFilterClick(months) {
    this.rangeStart = this.githubService.getMonthsRange(months);
  }

  flatten(data) {
    return data.reduce((agg, curr) => agg.concat(curr));
  }

  aggregate(data, field) {
    return data.reduce((agg, curr) => {
                 agg[curr[field]] = (agg[curr[field]] || 0) + 1
    	           return agg;
               }, {})
  }

  groupLabels(data) {
    const labels = this.aggregate(this.flatten(data.map(item => item.labels)), 'name');
    const low = (labels['SEV: Low'] / data.length);
    const medium = labels['SEV: Medium'] / data.length;
    const high = labels['SEV: High'] / data.length;
	  const enhancement = labels['Enhancement'] / data.length;
    const feature = labels['Feature'] / data.length;
    const other = 1 - low - medium - high - enhancement - feature;

    return {
      low: parseFloat(low.toFixed(2)),
      medium: parseFloat(medium.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      enhancement: parseFloat(enhancement.toFixed(2)),
      feature: parseFloat(feature.toFixed(2)),
      other: parseFloat(other.toFixed(2))
    }
  }

  distribution(data) {
    return data.map(item => ({
                  created_at: new Date(item.created_at).setHours(0,0,0,0),
                  label: this.cleanupLabels(item.labels)
                }))
                .reduce((agg, curr) => {
                  agg[curr.created_at] = agg[curr.created_at] || [];
                  agg[curr.created_at].push({ label: curr.label });
                  return agg
                }, {})
  }

  cleanupLabels(labels) {
    let filtered = labels.filter(label => this.hasValidKey(label))
                         .map(label => ({name: label.name}))
    return filtered.length === 0 ? 'Others' : filtered[0].name;
  }

  hasValidKey(label) {
    return label.name === 'SEV: Low' ||
           label.name === 'Enhancement'
  }

  closeRatePerDay(data) {
    const closed = this.aggregate(data.closed.map(item => ({
      created_at: new Date(item.created_at).setHours(0,0,0,0)
    })), 'created_at')

    const open = this.aggregate(data.open.map(item => ({
      created_at: new Date(item.created_at).setHours(0,0,0,0)
    })), 'created_at')

    const rate = Object.keys(closed).map(key => {
      const closedKey = closed[key] || 0;
      const openKey = open[key] || 0;
      const closeRate = closedKey / (closedKey + openKey);
      return {
        created_at: key,
        close_rate: closeRate
      }
    })

    return {
      lowest: rate.reduce((agg, curr) => agg.close_rate < curr.close_rate ? agg : curr),
      highest: rate.reduce((agg, curr) => agg.close_rate > curr.close_rate ? agg : curr)
    }
  }
}

