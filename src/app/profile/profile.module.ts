import { NgModule } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './profile.common';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    ButtonsModule,
    DialogModule,
    InputsModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class ProfileModule { }
