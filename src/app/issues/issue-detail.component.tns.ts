import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GithubService } from './../shared/github.service';
import { IssuesProcessor } from './../shared/issues-processor.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Issue } from './../shared/issues.model';
import { Page } from "ui/page";

@Component({
  moduleId: module.id,
  selector: "ns-issue-detail",
  templateUrl: './issue-detail.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IssueDetailComponent implements OnInit {
  issue: Issue;
  isTruncating: boolean = true;

  get truncateLength(): number {
    return this.isTruncating ? 200 : 10000;
  }

  constructor(
      public page: Page,
      public route: ActivatedRoute,
      public githubService: GithubService,
      private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.githubService.getGithubIssue(id).toPromise().then((data) => {
      this.page.actionBarHidden = false;
      this.issue = IssuesProcessor.mapIssue(data);
    });
  }

  onNavBtnTap(){
    this.routerExtensions.back();
  }
  toggleTruncate() {
    this.isTruncating = !this.isTruncating;
  }
}
