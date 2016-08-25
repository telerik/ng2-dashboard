import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { Overview } from './overview';
import { Issues } from './issues';
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
import { DataResolver } from './app.resolver';

const asyncRoutes: AsyncRoutes = {
  'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
  'Index': require('es6-promise-loader!./+detail')
};

const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail']
];

export const ROUTES: Routes = [
  { path: '',      component: Overview },
  { path: 'overview',  component: Overview },
  { path: 'issues',  component: Issues }
];

export const ROUTING_PROVIDERS = [
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks)
];


