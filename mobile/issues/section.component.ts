import { Component, Input } from '@angular/core';

@Component({
  selector: 'ns-section',
  styles: [require("../app.scss").toString()],
  template: `
    <GridLayout rows="auto auto auto" [row]="row">
        <Label *ngIf="title" [text]="title" class="section-title" margin="16 16 4 16"></Label>

        <StackLayout row="1" margin="4 16 16 16">
            <ng-content></ng-content>
        </StackLayout>

        <StackLayout row="2" class="hr-light"></StackLayout>
    </GridLayout>
  `
})
export class SectionComponent {
  @Input() title: string;
  @Input() row: number;
}