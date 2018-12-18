import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { DrinkService } from './../drink.service';
import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Order[];
  employees: Employee[];
  drinks: Drink[];

  constructor(
    private drinkService: DrinkService,
    private orderService: OrderService,
    private employeeService: EmployeeService
    ) { }

  ngOnInit() {
    this.getOrders();
    this.getDrinks();
    this.getEmployees();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks);
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }
}
