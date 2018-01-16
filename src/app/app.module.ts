import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_PROVIDERS } from './app.common';

// Kendo UI
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';

// Components
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';
import { LabelClass } from './issues/label.directive';
import { MarkdownComponent } from './markdown/markdown.component';
import { ActiveIssuesComponent } from './charts/active-issues.component';
import { TypesDistributionComponent } from './charts/types-distribution.component';
import { IssueTypesComponent } from './charts/issue-types.component';
import { StatisticsComponent } from './charts/statistics.component';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

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
        BrowserModule,
        ChartsModule,
        GridModule,
        DialogModule,
        InputsModule,
        ButtonsModule,
        BrowserAnimationsModule,
        LayoutModule,
        HttpClientModule,
        ...SHARED_MODULES
    ],
    providers: [
        ...SHARED_PROVIDERS,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
