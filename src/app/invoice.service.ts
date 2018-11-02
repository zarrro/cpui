import { Injectable } from '@angular/core';
import { InvoiceParams } from './invoice-params' ;
import { MessageService } from './message.service';
import { InvoiceFiles } from './invoice-files';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const invoicesUrl = environment.apiUrl + "/invoices";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private messagesService: MessageService) {};

  generate_invoice(invoice: InvoiceParams):Observable<string> {
    return this.http.post(invoicesUrl, invoice, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    }).pipe(
      tap((invoiceFile: string) => this.log(`added invoice ${invoiceFile}`)),
      catchError(this.handleError<string>('generate_invoice'))
    );
  }

  get_invoice_files():Observable<InvoiceFiles> {
    console.log('get_invoice_files: ' + invoicesUrl);
    return this.http.get<InvoiceFiles>(invoicesUrl, httpOptions).pipe(
      tap((i: InvoiceFiles) => this.log(`got invoice files: ${i.filenames}`)),
      catchError(this.handleError<InvoiceFiles>('get_invoice_files'))
    );
  }

  log(message: string) {
    this.messagesService.add('CargoRouteService: ' + message);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}