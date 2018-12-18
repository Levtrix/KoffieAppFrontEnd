import { DrinkService } from './../drink.service';
import { Drink } from './../drink';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  drinks: Drink[];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private drinkService: DrinkService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getDrinks();
    this.getOrder();
  }

  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrder(id)
      .subscribe(order => this.order = order);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.orderService.updateOrder(this.order)
      .subscribe(() => this.goBack());
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(drinks => this.drinks = drinks);
  }
}
