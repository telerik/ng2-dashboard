import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { IssuesComponent } from './issues';
import { DashboardComponent } from './dashboard';
import { ProfileComponent } from './profile';
import { SigninComponent } from './signin';

export const ROUTES: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'issues',  component: IssuesComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'signin',  component: SigninComponent }
];

export const ROUTING_PROVIDERS = [
];