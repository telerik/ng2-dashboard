import { Component, Input } from '@angular/core';
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';

@Component({
  selector: 'statistics',
  template: `
    <active-issues [data]="issues.groupedIssues" [months]="months" [issues]="issues" [closeRate]="issues.closeRate.average" [active]="issues.active"></active-issues>
    <types-distribution [data]="issues.typesDistribution" [months]="months" *ngIf="issues.active.length"></types-distribution>
    <issue-types [data]="issues.issueTypes"></issue-types>
  `
})
export class StatisticsComponent {
    @Input() public issues;
    @Input() public months;
}