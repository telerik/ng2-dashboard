import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES, ROUTING_PROVIDERS } from './app.routes';

// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { NoContent } from './no-content';
// import { ButtonsModule } from '@progress/kendo-angular-buttons';
// import { GridModule } from '@progress/kendo-angular-grid';
// import { InputsModule } from '@progress/kendo-angular-inputs';
// import { DialogModule } from '@progress/kendo-angular-dialog';
// import { ChartsModule } from '@progress/kendo-angular-charts';
// import { LayoutModule } from '@progress/kendo-angular-layout';

// import { ActiveIssuesComponent } from './charts/active-issues.component';

// import { MarkdownComponent } from './markdown/markdown.component';
// import { Issues } from './issues/issues.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent,
    // MarkdownComponent,
    // Issues,
    // ActiveIssuesComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    // ButtonsModule,
    // GridModule,
    // InputsModule,
    // DialogModule,
    // ChartsModule,
    // LayoutModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ROUTING_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
