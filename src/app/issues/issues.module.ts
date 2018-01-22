import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './issues.common';

// Kendo UI
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { LabelClass } from './label.directive';
import { MarkdownComponent } from './markdown/markdown.component';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    GridModule,
    DialogModule,
    InputsModule,
    ButtonsModule,
    LayoutModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    LabelClass,
    MarkdownComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class IssuesModule { }
