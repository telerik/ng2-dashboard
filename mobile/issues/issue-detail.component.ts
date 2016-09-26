import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GithubService } from '../../shared/github.service';
import { IssuesProcessor } from '../../shared/issues-processor.service';
import { Issue } from '../../shared/issues.model';
import { Page } from "ui/page";

@Component({
  selector: "ns-issue-detail",
  styles: [require("../app-styles").all],
  template: require("./issue-detail.component.html")
})
export class IssueDetail implements OnInit {
  issue: Issue;
  isTruncating: boolean = true;

  get truncateLength(): number {
    return this.isTruncating ? 200 : 10000;
  }

  constructor(public page: Page, public route: ActivatedRoute, public githubService: GithubService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    const id = +this.route.snapshot.params["id"];

    this.githubService.getGithubIssue(id).toPromise().then((data) => {
      this.page.actionBarHidden = false;
      this.issue = IssuesProcessor.mapIssue(data);
    });
  }

  toggleTruncate() {
    this.isTruncating = !this.isTruncating;
  }
}
