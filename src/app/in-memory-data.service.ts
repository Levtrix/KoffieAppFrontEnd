import { Drink } from './drink';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const drinks = [
      { id: 1, name: 'Zwart'},
      { id: 2, name: 'Latte'},
      { id: 3, name: 'Cappuccino'},
      { id: 4, name: 'Thee'},
    ];

    return {drinks};
  }

  // Overrides the genId method to ensure that a drink always has an id.
  // If the drinks array is empty,
  // the method below returns the initial number (1).
  // if the drinks array is not empty, the method below returns the highest
  // drink id + 1.
  genId(drinks: Drink[]): number {
    return drinks.length > 0 ? Math.max(...drinks.map(drink => drink.id)) + 1 : 1;
  }
}
