import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TABSTRIP_DIRECTIVES } from '@progress/kendo-angular-layout';
import { GithubService } from '../common/github.service'
import { IssuesProcessor } from '../common/issues-processor.service'
import { KendoButton, KendoButtonGroup } from '@progress/kendo-angular-buttons';
import { IssueTypesComponent } from '../charts/issue-types.component';
import { TypesDistributionComponent } from '../charts/types-distribution.component';
import { ActiveIssuesComponent } from '../charts/active-issues.component';


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

  issues: any = {
    active: [],
    groupedIssues: {
      open: [],
      closed: []
    },
    closeRate: {
      average: 0,
      highest: {
        close_rate: 0,
        created_at: 0
      },
      lowest: {
        close_rate: 0,
        created_at: 0
      }
    },
    typesDistribution: {
      Enhancement: [],
      Others: [],
      'SEV: Low': []
    }
  };

  rangeStart: Date = this.githubService.getMonthsRange(1);
  constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
    githubService.getGithubIssues({pages: 3}).subscribe((data: any[]) => {
      this.issues = issuesProcessor.process(data);
    })
  }

  onFilterClick(months) {
    this.rangeStart = this.githubService.getMonthsRange(months);
  }
}

