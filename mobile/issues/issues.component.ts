import { Component } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import "rxjs/add/operator/combineLatest";

import { GithubService } from '../../shared/github.service';
import { IssuesProcessor } from '../../shared/issues-processor.service';
import { Issue } from '../../shared/issues.model';
import { prompt } from "ui/dialogs";

@Component({
  selector: "ns-issues",
  styles: [require("../app.scss").toString()],
  template: require("./issues.component.html"),
})
export class IssuesComponent {
  filters = [
    { title: 'all' },
    { title: 'open' },
    { title: 'closed' },
    { title: 'yours' }
  ];

  private _selectedFilter: number;
  get selectedFilter(): number {
    return this._selectedFilter;
  }
  set selectedFilter(val: number) {
    if (val === 3 && !this.user$.getValue()) {
      this.promptUser();
    }

    this.filter$.next(val);
    this._selectedFilter = val;
  }

  private _search: string;
  get search(): string {
    return this._search;
  }
  set search(val: string) {
    this.search$.next(val);
    this._search = val;
  }

  loading: boolean = true;
  filteredIssues$: Observable<Issue[]>;
  search$: BehaviorSubject<string> = new BehaviorSubject(null);
  filter$: BehaviorSubject<number> = new BehaviorSubject(0);
  user$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
    const activeIssues = githubService
      .getGithubIssues({ pages: 2 })
      .map(data => this.issuesProcessor.process(data, 1).active);

    activeIssues.toPromise().then(() => this.loading = false);

    this.filteredIssues$ = Observable
      .combineLatest(activeIssues, this.filter$, this.search$, this.user$)
      .do(() => this.loading = true)
      .debounceTime(300)
      .do(() => this.loading = false)
      .map(([issues, filter, search, user]) => {
        if (!issues) {
          return [];
        }

        return issues.filter(issue =>
          !(search && issue.title.indexOf(search) < 0) &&
          !(filter === 1 && issue.state !== "open") &&
          !(filter === 2 && issue.state !== "closed") &&
          !(filter === 3 && user && issue.author.name !== user)
        );
      });
  }

  promptUser() {
    prompt("Enter your github handle", this.user$.getValue() || "").then(res => {
      if (res.result) {
        this.user$.next(res.text);
      }
    });
  }
}
