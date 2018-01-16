import { Routes } from '@angular/router';
// app
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

export const IssuesRoutes: Routes = [
  {
    path: '',
    component: IssuesComponent
  },
  {
    path: 'detail/:id',
    component: IssueDetailComponent
  }
];
