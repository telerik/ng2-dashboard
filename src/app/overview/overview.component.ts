import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TABSTRIP_DIRECTIVES } from '@progress/kendo-angular-layout';
import { GithubService } from '../common/github.service'
import { IssuesProcessor } from '../common/issues-processor.service'
import { KendoButton, KendoButtonGroup } from '@progress/kendo-angular-buttons';
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';
import { IssuesModel } from '../common/issues.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'overview',
  directives: [KendoButton, KendoButtonGroup, TABSTRIP_DIRECTIVES, IssueTypesComponent, TypesDistributionComponent, ActiveIssuesComponent],
  providers: [GithubService, IssuesProcessor],
   styles: [
      require("../app.style.scss").toString()
  ],
  templateUrl: './overview.template.html'
})
export class Overview {
  issues: IssuesModel;
  today: Date = new Date();
  rangeStart: Date = this.githubService.getMonthsRange(12);
  constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
    this.fetchData();
  }

  onFilterClick(months) {
    this.rangeStart = this.githubService.getMonthsRange(months);
  }

  fetchData() {
    this.githubService
      .getGithubIssues({pages: 15})
      .map(data => this.issuesProcessor.process(data))
      .merge(Observable.of(new IssuesModel()))
      .subscribe((data: IssuesModel) => {
        this.issues = data
      });
  }
}

