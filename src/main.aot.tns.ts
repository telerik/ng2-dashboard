// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from 'nativescript-angular/platform-static';

import { AppModuleNgFactory } from './app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

import {
  rendererTraceCategory
} from 'nativescript-angular/trace';

import { setCategories, enable } from 'trace';
setCategories(`${rendererTraceCategory}`);
enable();

if (environment.production) {
  enableProdMode();
}

platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
