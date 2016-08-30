import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { Overview } from './overview';
import { Issues } from './issues';
import { Dashboard } from './dashboard';
import { Profile } from './profile';
import { Signin } from './signin';

export const ROUTES: Routes = [
  { path: '',      component: NoContent },
  { path: 'overview',  component: Overview },
  { path: 'issues',  component: Issues },
  { path: 'dashboard',  component: Dashboard },
  { path: 'profile',  component: Profile },
  { path: 'signin',  component: Signin }
];

export const ROUTING_PROVIDERS = [
];


