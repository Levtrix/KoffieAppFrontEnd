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
  employee: Employee = new Employee;
  drink: Drink = new Drink;

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

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks);
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  addOrder(sugarAmount: number, milkAmount: number): void {
    if ((!this.employee) || (!this.drink) || (!sugarAmount) || (!milkAmount)) { return; }

    this.orderService.addOrder(this.buildNewOrderObject(this.employee, this.drink, sugarAmount, milkAmount))
      .subscribe(order => {
        this.orders.push(order);
      });
  }

  deleteOrder(order: Order): void {
    this.orders = this.orders.filter(o => o !== order);
    this.orderService.deleteOrder(order).subscribe();
  }

  onEmployeeChange(employee: Employee): void {
    this.employee = employee;
  }

  onDrinkChange(drink: Drink): void {
    this.drink = drink;
  }

  private buildNewOrderObject(employee: Employee, drink: Drink, sugarAmount: number, milkAmount: number): Order {
    return new Order(employee, drink, sugarAmount, milkAmount);
  }
}
