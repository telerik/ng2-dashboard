import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule } from '@angular/http';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';
import { LabelClass } from './issues/label.directive';
import { MarkdownComponent } from './markdown/markdown.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ActiveIssuesComponent } from './charts/active-issues.component';
import { TypesDistributionComponent } from './charts/types-distribution.component';
import { IssueTypesComponent } from './charts/issue-types.component';
import { StatisticsComponent } from './charts/statistics.component';
import { ChartsModule } from '@progress/kendo-angular-charts';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(<any>http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        LabelClass,
        AppComponent,
        MainMenuComponent,
        SigninComponent,
        DashboardComponent,
        ProfileComponent,
        IssuesComponent,
        MarkdownComponent,
        ActiveIssuesComponent,
        TypesDistributionComponent,
        IssueTypesComponent,
        StatisticsComponent
    ],
    imports: [
        ChartsModule,
        GridModule,
        DialogModule,
        InputsModule,
        ButtonsModule,
        BrowserAnimationsModule,
        LayoutModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        ...SHARED_MODULES
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
