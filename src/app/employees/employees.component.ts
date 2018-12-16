import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  addEmployee(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();

    if ((!firstName) || (!lastName)) { return; }

    this.employeeService.addEmployee({ firstName, lastName} as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }
}
