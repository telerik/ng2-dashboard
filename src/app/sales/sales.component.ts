import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
@Component({
  selector: 'sales',
  styles: [`
  `],
  template: `
    <h1>Orders List</h1>
    <table>
      <tr *ngFor="let country of countries | async">
        <td>{{country.countryshortname}}</td>
        <td>{{country.boardapprovaldate}}</td>
        <td>{{country.lendprojectcost}}</td>
      </tr>
    </table>
  `
})
export class Sales {
  private countries: FirebaseListObservable<any[]>;
  constructor(public firebase: AngularFire) {
    this.countries = firebase.database.list('/WorldBank', {
      query: {
        limitToFirst: 10,
        orderByKey: true
      }
    })
  }
}
