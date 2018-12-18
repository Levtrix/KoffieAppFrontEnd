import { Location } from '@angular/common';
import { EmployeeService } from './../employee.service';
import { DrinkService } from './../drink.service';
import { OrderService } from './../order.service';
import { Drink } from './../drink';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Order } from '../order';

@Component({
  selector: 'app-order-save',
  templateUrl: './order-save.component.html',
  styleUrls: ['./order-save.component.css']
})
export class OrderSaveComponent implements OnInit {
  employees: Employee[];
  drinks: Drink[];

  constructor(
    private orderService: OrderService,
    private drinkService: DrinkService,
    private employeeService: EmployeeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks);
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  addOrder(employee: Employee, drink: Drink, sugarAmount: number, milkAmount: number): void {
    if ((!employee) || (!drink) || (!sugarAmount) || (!milkAmount)) { return; }

    this.orderService.addOrder({employee, drink, sugarAmount, milkAmount} as Order)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
