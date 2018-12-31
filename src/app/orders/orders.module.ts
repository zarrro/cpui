import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ClarityModule } from '@clr/angular';
import { FreightEditorComponent } from './components/freight-editor/freight-editor.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [OrdersComponent, OrdersListComponent, FreightEditorComponent]
})
export class OrdersModule {
  constructor() {
    console.log('OrdersModule loaded.');
  }
}
