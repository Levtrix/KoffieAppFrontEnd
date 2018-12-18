import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order } from './order';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private koffieUrl = 'http://koffie.gledant.nl:8095/order'; // URL to web api
  private inMemoryUrl = 'api/drinks'; // URL to in memory context db

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET orders from the server */
  getOrders(): Observable<Order[]> {
    const url = `${this.koffieUrl}/all`;

    return this.http.get<Order[]>(url)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.koffieUrl}/${id}`;

    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  /** POST: add a new order to the server */
  addOrder(order: Order): Observable<Order> {
    const url = `${this.koffieUrl}/save`;

    return this.http.post<Order>(url, order, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((order: Order) => this.log(`added order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** PUT: update the order on the server */
  updateOrder(order: Order): Observable<any> {
    const url = `${this.koffieUrl}/edit`;

    return this.http.put(url, order, httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  /** DELETE: delete the order from the server */
  deleteOrder(order: Order): Observable<Order> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.koffieUrl}/delete/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  /** Log a DrinkService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DrinkService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
