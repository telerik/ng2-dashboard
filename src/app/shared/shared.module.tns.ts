import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { RouterModule } from '../common';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    declarations: [],
    exports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        RouterModule,
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
