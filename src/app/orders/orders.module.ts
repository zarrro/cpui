import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ClarityModule } from '@clr/angular';
import { FreightEditorComponent } from './components/freight-editor/freight-editor.component';
import { LegalEntityComponent } from './components/legal-entity/legal-entity.component';
import { FreightListComponent } from './components/freight-list/freight-list.component';
import { FreightsComponent } from './pages/freights/freights.component';
import { DgFiltersStateComponent } from './components/dg-filters-state/dg-filters-state.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [OrdersComponent, OrdersListComponent, FreightEditorComponent, LegalEntityComponent, FreightListComponent, FreightsComponent, DgFiltersStateComponent]
})
export class OrdersModule {
  constructor() {
    console.log('OrdersModule loaded.');
  }
}
