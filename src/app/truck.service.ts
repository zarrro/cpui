import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { MessageService } from './message.service';
import { Truck } from './truck';
import { headersToString } from 'selenium-webdriver/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const trucksUrl = environment.apiUrl + "/trucks";


@Injectable({
  providedIn: 'root'
})
export class TruckService {

    constructor(private http: HttpClient, private messagesService: MessageService) {};

    getAllTrucks(): Observable<Truck[]> {
        return this.http.get(trucksUrl, httpOptions).pipe(
            map((data:Object) => (data['trucks'])),
            catchError(this.handleError<Truck[]>('getAllTrucks'))
        );
    }

    addTruck(truck:Truck): Observable<Truck> {
        return this.http.post<Truck>(trucksUrl, truck, httpOptions).pipe(
            catchError(this.handleError<Truck>('addTruck'))
        );
    }

    updateTruck(truck:Truck): Observable<Truck> {
        return this.http.patch<Truck>(trucksUrl, truck, httpOptions).pipe(
            catchError(this.handleError<Truck>('updateTruck'))
        );
    }

    removeTruckById(truckId:number): Observable<any> {
        return this.http.delete(trucksUrl + "/" + truckId, httpOptions).pipe(
            catchError(this.handleError<any>('removeTruckById'))
        );
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }
}