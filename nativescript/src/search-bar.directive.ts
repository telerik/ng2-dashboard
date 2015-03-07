import { Directive, ElementRef } from "@angular/core";
import { Page } from "ui/page";
import { isAndroid } from "platform";

@Directive({
    selector: "SearchBar"
})
export class SearchBarDirective {
    constructor(private element: ElementRef, private page: Page) {
        this.page.on("navigatedTo", () => {
            const bar = this.element.nativeElement;

            if (isAndroid) {
                bar.android.clearFocus();
            }
        });
    }
}
