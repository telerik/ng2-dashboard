import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// nativescript
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_PROVIDERS } from './app.common';

import { SigninComponent } from './signin/signin.component';

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
        SigninComponent,
    ],
    providers: [
        ...SHARED_PROVIDERS,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
