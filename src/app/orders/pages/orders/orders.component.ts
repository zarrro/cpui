import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../../domain/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private orders: Order[];
  private loading: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.initOrders();
  }

  initOrders(): void {
    //server side paging is ignored
    this.orderService.getOrders().subscribe((result:Order[]) => {
      this.orders = result;
      this.loading = false;
      console.log('orders acquired: ' + this.orders.length)
    })
  }

}
