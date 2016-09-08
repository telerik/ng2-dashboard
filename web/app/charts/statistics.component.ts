import { Component, Input } from '@angular/core';
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';

@Component({
  selector: 'statistics',
  template: `
    Active Issues = {{ issues.open + issues.closed }}
    Open Issues = {{ issues.open }}
    Closed Issues = {{ issues.closed }}
    Close rate = {{ issues.closeRate.average | percent:'2.0-0' }}
    Highest: {{issues.closeRate.highest.close_rate | percent: '2.0-0' }} on {{issues.closeRate.highest.created_at | date}}
    Lowest: {{issues.closeRate.lowest.close_rate | percent: '2.0-0' }} on {{issues.closeRate.lowest.created_at | date}}
    <active-issues [data]="issues.groupedIssues" [active]="issues.active"></active-issues>
    <types-distribution [data]="issues.typesDistribution"></types-distribution>
    <issue-types [data]="issues.issueTypes"></issue-types>
  `
})
export class StatisticsComponent {
    @Input() public issues;
}