import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { Overview } from './overview';
import { Issues } from './issues';
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
import { DataResolver } from './app.resolver';

const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
  'Index': require('es6-promise-loader!./+detail'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail'],
   // es6-promise-loader returns a function
];

export const ROUTES: Routes = [
  { path: '',      component: Overview },
  { path: 'overview',  component: Overview },
  { path: 'issues',  component: Issues }
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings

export const ROUTING_PROVIDERS = [
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks)
];


