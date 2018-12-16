import { DrinkService } from './../drink.service';
import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks.slice(0, 4));
  }
}
