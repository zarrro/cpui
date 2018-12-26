import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { } from '../../ui-common/page';
import { Order } from '../../domain/order';
import { Page } from '../../ui-common/page';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const ordersUrl = environment.apiUrl + "/orders";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { };
/*
    getOrdersPage(page: number, size: number): Observable<PageT<Order>> {
        let url = ordersUrl;
        if (page && size) {
            url = this.addPagingUrlParams(url, page, size);
        }
        return this.http.get(url, { headers: headers, observe: 'response' }).pipe(
            map((resp: HttpResponse<Order[]>) => (Page.fromHttpResponse<Order>(resp))),
            catchError(this.handleError<PageT<Order>>('getOrdersPage'))
        );
    }
*/
    getOrders(): Observable<Order[]> {
        let url = ordersUrl;
        return this.http.get(url, { headers: headers }).pipe(
            map((body:Object) => (body as Order[])),
            catchError(this.handleError<Order[]>('getOrdersPage')));
    }
/* 
    private addPagingUrlParams(url: string, page: number, size: number): string {
        return url + "?page=" + page + "&size=" + size;
    }
*/
    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
