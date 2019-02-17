import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private koffieUrl = 'http://koffie.gledant.nl/employee'; // URL to web api
  private inMemoryUrl = 'api/employees';  // URL to in memory context db

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET employees from the server */
    getEmployees(): Observable<Employee[]> {
      const url = `${this.koffieUrl}/all`;

      return this.http.get<Employee[]>(url)
        .pipe(
          tap(_ => this.log('fetched employees')),
          catchError(this.handleError('getEmployees', []))
        );
    }

    /** GET employee by id. Will 404 if id not found */
    getEmployee(id: number): Observable<Employee> {
      const url = `${this.koffieUrl}/${id}`;

      return this.http.get<Employee>(url).pipe(
        tap(_ => this.log(`fetched employee id=${id}`)),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
    }

    /** POST: add a new employee to the server */
    addEmployee(employee: Employee): Observable<Employee> {
      const url = `${this.koffieUrl}/save`;

      return this.http.post<Employee>(url, employee, httpOptions).pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((employee: Employee) => this.log(`added employee w/ id=${employee.id}`)),
        catchError(this.handleError<Employee>('addEmployee'))
      );
    }

    /** PUT: update the employee on the server */
    updateEmployee(employee: Employee): Observable<any> {
      const url = `${this.koffieUrl}/edit`;

      return this.http.put(url, employee, httpOptions).pipe(
        tap(_ => this.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
      );
    }

    /** Log a EmployeeService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`EmployeeService: ${message}`);
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
