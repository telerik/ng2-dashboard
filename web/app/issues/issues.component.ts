import { Component } from '@angular/core';
import { MarkdownComponent } from '../markdown/markdown.component';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { GithubService } from '../../../shared/github.service'

@Component({
  selector: 'issues',
  providers: [
    GithubService
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
  localState = { value: '' };

  constructor(public http: Http, public githubService: GithubService) {
    githubService.getGithubIssues({pages: 4}).subscribe((data: any[]) => {
      data = data.reduce((agg, curr) => [...agg, ...curr], []).filter(issue => issue.pull_request ? false : true);
      this.allIssues = data;
      this.applyPaging(data)
    })
  }

  onFilterClick(e) {
    this.skip = 0;
    //this.applyPaging(this.githubService.filterByMonth(this.allIssues, e)); CHANGE THIS TO NEW SERVICE
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
}
