// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { DashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ActiveIssuesComponent } from './charts/active-issues.component';
import { TypesDistributionComponent } from './charts/types-distribution.component';
import { IssueTypesComponent } from './charts/issue-types.component';
import { StatisticsComponent } from './charts/statistics.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>DashboardRoutes)
];

export const COMPONENT_DECLARATIONS: any[] = [
  DashboardComponent,

  ActiveIssuesComponent,
  TypesDistributionComponent,
  IssueTypesComponent,
  StatisticsComponent
];
