import { Component, ViewEncapsulation } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { GithubService } from '../../../shared/github.service'
import { IssuesProcessor } from '../../../shared/issues-processor.service';

@Component({
  selector: 'issues',
  encapsulation: ViewEncapsulation.None,
  providers: [
    GithubService,
    IssuesProcessor
  ],
  styles: [
      require("../app.style.scss").toString()
  ],
  templateUrl: './issues.template.html'
})
export class Issues {
  public issues: any;
  public allIssues: any;
  public view: any;
  public total = 5;
  public pageSize = 5;
  public skip = 0;
  public today = new Date();
  public months = 1;
  public range = this.dateRange();

  constructor(public http: Http, public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
    githubService.getGithubIssues({pages: 12}).subscribe((data: any[]) => {
      data = data.reduce((agg, curr) => [...agg, ...curr], []).filter(issue => issue.pull_request ? false : true);
      this.allIssues = data;
      this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, 1))
    })
  }

  onFilterClick(e) {
    this.skip = 0;
    this.months = e;
    this.range = this.dateRange();
    this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, e));
  }

  onPageChange(e) {
    this.skip = e.skip;
    this.view = this.getView(e.skip, e.take);
  }

  applyPaging(data) {
    this.issues = data;
    this.view = this.getView(this.skip, this.pageSize);
  }

  getView(skip, take) {
    return {
      data: this.issues.slice(skip, skip + take),
      total: this.issues.length
    }
  }

  dateRange() {
    return {
      from: new Date(),
      to: this.issuesProcessor.getMonthsRange(this.months)
    }
  }
}
