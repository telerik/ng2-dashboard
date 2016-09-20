// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NgModule } from "@angular/core";

import { appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";

import { IssuesComponent } from "./issues/issues.component";
import { IssueDetail } from "./issues/issue-detail.component";
import { SectionComponent } from "./issues/section.component";
import { UserComponent } from "./issues/user.component";
import { StatusImagePipe } from "./issues/status-image.pipe";
import { TruncatePipe } from "./issues/truncate.pipe";
import { SegmentedBarDirective } from "./segmented-bar.directive";
import { ActionBarDirective } from "./action-bar.directive";

import { GithubService } from '../shared/github.service';
import { IssuesProcessor } from '../shared/issues-processor.service';

@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    SectionComponent,
    UserComponent,
    IssueDetail,
    StatusImagePipe,
    TruncatePipe,
    SegmentedBarDirective,
    ActionBarDirective,
  ],
  providers: [
    GithubService,
    IssuesProcessor
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
})
export class AppComponentModule { }
