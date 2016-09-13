// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, AppOptions } from "nativescript-angular/platform";
import { AppComponentModule } from "./app.module";

const options: AppOptions = {
    startPageActionBarHidden: false,
    bootInExistingPage: false
};

platformNativeScriptDynamic(options).bootstrapModule(AppComponentModule);
