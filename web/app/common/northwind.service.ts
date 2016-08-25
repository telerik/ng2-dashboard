import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { GridDataResult } from '@progress/kendo-angular-grid';

export abstract class NorthwindService {
    private BASE_URL: string = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
    private data: Subject<GridDataResult>;

    constructor(private http: Http, private tableName: string) {
        this.data = new Subject<GridDataResult>();
    }

    private sort(orderby) {
        return orderby.map(value => {
            var order = value.field.replace(/\./g, "/");

            if (value.dir === "desc") {
                order += " desc";
            }

            return order;
        }).join(",");
    }

    private fetch(tableName, { skip = 0, take = 10, sort = [] }): Observable<GridDataResult> {
        let orderBy = this.sort(sort);

        if (orderBy) {
          orderBy = "$orderby=" + orderBy;
        }

        return this.http
            .get(`${this.BASE_URL}${tableName}?$top=${take}&$skip=${skip}&$count=true&${orderBy}`)
            .map(response => response.json())
            .map(response => (<GridDataResult>{
                data: response.value,
                total: parseInt(response["@odata.count"], 10)
            }));
    }

    public load() {
        this.query();

        return this.data;
    }

    public query(state = {}) {
        this.fetch(this.tableName, state)
            .subscribe(x => this.data.next(x));
    }
}

@Injectable()
export class ProductsService extends NorthwindService {
    constructor(http: Http) { super(http, "Products"); }
}

@Injectable()
export class CategoriesService extends NorthwindService {
    constructor(http: Http) { super(http, "Categories"); }
}