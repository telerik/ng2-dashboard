// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { IssuesRoutes } from './issues.routes';
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>IssuesRoutes)
];

export const COMPONENT_DECLARATIONS: any[] = [
  IssuesComponent,
  IssueDetailComponent
];
