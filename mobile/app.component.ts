import {Component} from "@angular/core";
import { GithubService } from '../shared/github.service';
import { IssuesProcessor } from '../shared/issues-processor.service';
import { IssuesModel } from '../shared/issues.model';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: "my-app",
    providers: [GithubService, IssuesProcessor],
    template: require("./app.component.html"),
    styles: [require("./app.scss").toString()
  ],
})
export class AppComponent {
    issues: IssuesModel;
    subscription: Subscription;
    months: number = 1;

    constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
        this.subscription = githubService
            .getGithubIssues({ pages: 12 })
            .map(data => this.issuesProcessor.process(data, this.months))
            .merge(Observable.of(new IssuesModel()))
            .subscribe((data: IssuesModel) => {
                this.issues = data;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
