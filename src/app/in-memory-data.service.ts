import { map } from 'rxjs/operators';
import { Drink } from './drink';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';
import { Order } from './order';
import { EmployeesComponent } from './employees/employees.component';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  employee1: Employee =  { id: 1, firstName: 'Henk', lastName: 'Ruijter' };
  employee2: Employee = { id: 2, firstName: 'Sanne', lastName: 'Pell'};

  createDb() {
    const drinks = [
      { id: 1, name: 'Zwart'},
      { id: 2, name: 'Latte'},
      { id: 3, name: 'Cappuccino'},
      { id: 4, name: 'Thee'},
    ];

    const employees = [
      { id: 1, firstName: 'Henk', lastName: 'Ruijter' },
      { id: 2, firstName: 'Sanne', lastName: 'Pell'}
    ];

    const orders = [
      { id: 1, Employee: employees.find(o => o.id === 1), Drink: drinks.find(o => o.id === 3), sugarAmount: 1, milkAmount: 0},
      { id: 2, Employee: employees.find(o => o.id === 2), Drink: drinks.find(o => o.id === 1), sugarAmount: 2, milkAmount: 1}
    ];

    return {drinks, employees, orders};
  }

  // Overrides the genId method to ensure that a drink, employee or an order always has an id.
  // If the arrays are empty,
  // the method below returns the initial number (1).
  // if the arrays are not empty, the method below returns the highest
  // id + 1.
  genId<T extends Drink | Employee | Order>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }

  /*
  genId(drinks: Drink[]): number {
    return drinks.length > 0 ? Math.max(...drinks.map(drink => drink.id)) + 1 : 1;
  } */
}
