import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES, ROUTING_PROVIDERS } from './app.routes';

import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { NoContent } from './no-content';
import { IssuesModule } from './issues';
import { DashboardModule } from './dashboard'
import { ProfileModule } from './profile'
import { SigninModule } from './signin'

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardModule,
    IssuesModule,
    ProfileModule,
    SigninModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    ROUTING_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
