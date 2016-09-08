import { Routes } from "@angular/router";

import { IssuesComponent } from "./issues/issues.component";
import { IssueDetail } from "./issues/issue-detail.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "/issues", pathMatch: "full" },
  // { path: "", redirectTo: "/detail/1682", pathMatch: "full" },
  { path: "issues", component: IssuesComponent },
  { path: "detail/:id", component: IssueDetail },
];

