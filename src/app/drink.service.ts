import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Drink } from './drink';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class DrinkService {
  private koffieUrl = 'http://koffie.gledant.nl/koffieapp/drink'; // URL to web api
  private inMemoryUrl = 'api/drinks'; // URL to in memory context db

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET drinks from the server */
  getDrinks(): Observable<Drink[]> {
    const url = `${this.koffieUrl}/all`;

    return this.http.get<Drink[]>(url)
      .pipe(
        tap(_ => this.log('fetched drinks')),
        catchError(this.handleError('getDrinks', []))
      );
  }

  /** GET drink by id. Will 404 if id not found */
  getDrink(id: number): Observable<Drink> {
    const url = `${this.koffieUrl}/${id}`;

    return this.http.get<Drink>(url).pipe(
      tap(_ => this.log(`fetched drink id=${id}`)),
      catchError(this.handleError<Drink>(`getDrink id=${id}`))
    );
  }

  /** POST: add a new drink to the server */
  addDrink(drink: Drink): Observable<Drink> {
    const url = `${this.koffieUrl}/save`;

    return this.http.post<Drink>(url, drink, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((drink: Drink) => this.log(`added drink w/ id=${drink.id}`)),
      catchError(this.handleError<Drink>('addDrink'))
    );
  }

  /** PUT: update the drink on the server */
  updateDrink(drink: Drink): Observable<any> {
    const url = `${this.koffieUrl}/edit`;

    return this.http.put(url, drink, httpOptions).pipe(
      tap(_ => this.log(`updated drink id=${drink.id}`)),
      catchError(this.handleError<any>('updateDrink'))
    );
  }

  /** DELETE: delete the drink from the server */
  deleteDrink(drink: Drink): Observable<Drink> {
    const id = typeof drink === 'number' ? drink : drink.id;
    const url = `${this.koffieUrl}/delete/${id}`;

    return this.http.delete<Drink>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted drink id=${id}`)),
      catchError(this.handleError<Drink>('deleteDrink'))
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
