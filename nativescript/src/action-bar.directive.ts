import { Directive, ElementRef } from "@angular/core";
import { Page } from "ui/page";

@Directive({
    selector: "ActionBar"
})
export class ActionBarDirective {
    constructor(private page: Page) {
        this.page.on("navigatedTo", () => {
            page.actionBar.update();
        });
    }
}
