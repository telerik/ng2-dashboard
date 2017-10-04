import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { Http } from '@angular/http';
// nativescript
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';
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
import { GithubService } from './shared/github.service';
import { IssuesProcessor } from './shared/issues-processor.service';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
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
        // Allows your {N} application to use lazy-loading
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
      GithubService,
      IssuesProcessor
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
