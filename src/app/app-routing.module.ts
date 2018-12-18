import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrinksComponent } from './drinks/drinks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { OrderSaveComponent } from './order-save/order-save.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'addorder', component: OrderSaveComponent},
  { path: 'drink-detail/:id', component: DrinkDetailComponent},
  { path: 'drinks', component: DrinksComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
