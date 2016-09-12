// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule, AppOptions } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, NativeScriptHttpModule],
})
class AppComponentModule { }

const options: AppOptions = {
    startPageActionBarHidden: false,
    bootInExistingPage: false
};

platformNativeScriptDynamic(options).bootstrapModule(AppComponentModule);
