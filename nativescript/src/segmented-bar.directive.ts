import { Directive, ElementRef } from "@angular/core";
import { Color } from "color";

@Directive({
    selector: "SegmentedBar"
})
export class SegmentedBarDirective {
    constructor(private element: ElementRef) {
        const bar = element.nativeElement;
        if (bar.ios) {
            const c = new Color("white");
            bar.ios.tintColor = c.ios;
        }
    }
}
