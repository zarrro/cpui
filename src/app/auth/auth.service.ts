import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const authUrl = environment.apiUrl + "/user";

@Injectable({providedIn:'root'})
export class AuthService {

    initialized: boolean = false;
    authenticated: boolean = false;
    username: string = '';

    constructor(private http: HttpClient) {
        console.log("debug create AuthService");
    }

    authenticate(credentials): Observable<boolean> {
        console.log("debug authenticate: " + credentials);
        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        return this.http.get(authUrl, { headers: headers }).pipe(
            map((response) => {
                this.initialized = true;
                if (response['name']) {
                    this.username = response['name'];
                    this.authenticated = true;
                    return true;
                } else {
                    this.authenticated = false;
                    this.username = '';
                    return false;
                }
            }),
            catchError(this.handleError())
        );
    }

    private handleError() {
        return (error: any): Observable<boolean> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // error is false authentication
            return of(false);
        };
    }
}