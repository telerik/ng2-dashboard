// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { ProfileRoutes } from './profile.routes';
import { ProfileComponent } from './profile/profile.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>ProfileRoutes)
];

export const COMPONENT_DECLARATIONS: any[] = [
  ProfileComponent
];
