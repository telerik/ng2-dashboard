import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../shared/github.service'
import { IssuesProcessor } from '../../../shared/issues-processor.service'
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';
import { IssuesModel } from '../../../shared/issues.model';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'dashboard',
  providers: [GithubService, IssuesProcessor],
  encapsulation: ViewEncapsulation.None,
  styles: [
      require("../app.style.scss").toString()
  ],
  templateUrl: './dashboard.template.html'
})
export class Dashboard {
  issues: IssuesModel;
  today: Date = new Date();
  months: number = 1;
  rangeStart: Date = this.issuesProcessor.getMonthsRange(this.months);
  data: any;
  subscription: Subscription;

  constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
    this.subscription = githubService
      .getGithubIssues({pages: 12})
      .map(data => {
        this.data = data;
        return this.issuesProcessor.process(data, this.months)
      })
      .merge(Observable.of(new IssuesModel()))
      .subscribe((data: IssuesModel) => {
        this.issues = data
      })
  }

  onFilterClick(months) {
    if (this.months !== months) {
      this.months = months;
      this.rangeStart = this.issuesProcessor.getMonthsRange(months);
      this.issues = this.issuesProcessor.process(this.data, months);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTabSelect(event) {
    console.log(event);
  }
}

