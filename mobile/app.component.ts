import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    styles: [require("./app.scss").toString()],
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

}
