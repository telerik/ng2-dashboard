import { Routes } from '@angular/router';
import { SigninComponent } from './signin';
/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/signin' },
    // { path: '', pathMatch: 'full', redirectTo: '/issues' },
    // { path: '', pathMatch: 'full', redirectTo: '/issues/detail/33' },
    // { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    // { path: '', pathMatch: 'full', redirectTo: '/profile' },
    { path: 'signin',  component: SigninComponent },
    {
        path: 'profile',
        loadChildren: '~/app/profile/profile.module#ProfileModule' },
    {
        path: 'issues',
        loadChildren: '~/app/issues/issues.module#IssuesModule'
    },
    {
        path: 'dashboard',
        loadChildren: '~/app/dashboard/dashboard.module#DashboardModule'
    },
];
