import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ClarityModule,
    ClrFormsNextModule
  ],
  declarations: [OrdersComponent, OrdersListComponent]
})
export class OrdersModule {
  constructor() {
    console.log('OrdersModule loaded.');
  }
}
