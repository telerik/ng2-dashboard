import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GithubService {
    constructor(public http: Http) {

     }

     getGithubIssues(pages) {
        return Observable.forkJoin(this.getIssuesUrls(pages))
     }

    getIssuesUrls({ pages }) {
        const headers = new Headers({'Authorization': "token 16c3c038dcfbc6847f1e4e5547f29f6a7d953c63"});
        const result = [];
        for (var index = 1; index < pages; index++) {
            result.push(
                this.http.get(`https://api.github.com/repos/telerik/kendo-ui-core/issues?state=all&page=${index}&per_page=100`, { headers: headers })
                .map(res => res.json())
            )
        }
        return result;
    }
}