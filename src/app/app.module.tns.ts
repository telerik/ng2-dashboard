import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// nativescript
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_PROVIDERS } from './app.common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issues/issue-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { StatusImagePipe } from './issues/statusImage.pipe';
import { TruncatePipe } from './issues/truncate.pipe';
import { SegmentedBarDirective } from './../segmented-bar.directive';
import { ActionBarDirective } from './../action-bar.directive';
import { SearchBarDirective } from './../search-bar.directive';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        IssuesComponent,
        IssueDetailComponent,
        ProfileComponent,
        SigninComponent,
        StatusImagePipe,
        SegmentedBarDirective,
        ActionBarDirective,
        SearchBarDirective,
        TruncatePipe
    ],
    providers: [
        ...SHARED_PROVIDERS,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
