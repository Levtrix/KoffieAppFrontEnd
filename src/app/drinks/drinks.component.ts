import { DrinkService } from './../drink.service';
import { Drink } from './../drink';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  drinks: Drink[];

  constructor(private drinkService: DrinkService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks);
  }

  addDrink(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.drinkService.addDrink({ name } as Drink)
      .subscribe(drink => {
        this.drinks.push(drink);
      });
  }

  deleteDrink(drink: Drink): void {
    this.drinks = this.drinks.filter(d => d !== drink);
    this.drinkService.deleteDrink(drink).subscribe();
  }
}
