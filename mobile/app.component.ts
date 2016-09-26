import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    styles: [require("./app-styles").all],
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

}
