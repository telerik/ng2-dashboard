import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './issues.common';

import { StatusImagePipe } from './statusImage.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    ...SHARED_MODULES,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    StatusImagePipe,
    TruncatePipe
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class IssuesModule { }
