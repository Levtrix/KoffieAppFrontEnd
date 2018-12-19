import { Drink } from './drink';
import { Employee } from './employee';

export class Order {
  id: number;
  employee: Employee;
  drink: Drink;
  sugarAmount: number;
  milkAmount: number;

  constructor(_employee: Employee, _drink: Drink, _sugarAmount: number, _milkAmount: number, _id?: number) {
    this.id = _id;
    this.employee = new Employee(_employee.id, _employee.firstName, _employee.lastName);
    this.drink = new Drink(_drink.id, _drink.name);
    this.sugarAmount = _sugarAmount;
    this.milkAmount = _milkAmount;
  }
}
