import { NgModule } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './dashboard.common';

// Kendo UI
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    ChartsModule,
    ButtonsModule,
    LayoutModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
  ],
})
export class DashboardModule { }
