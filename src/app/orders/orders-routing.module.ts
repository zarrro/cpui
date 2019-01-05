import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { FreightsComponent } from './pages/freights/freights.component';
import { FreightEditorComponent } from './components/freight-editor/freight-editor.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    canActivate: [AuthGuard],
	  path: 'console/orders',
    component: OrdersComponent
  },
  { 
    canActivate: [AuthGuard],
	  path: 'console/freights',
    component: FreightsComponent
  },
  { 
    // debug only route, this won't be routed component
    canActivate: [AuthGuard],
	  path: 'console/freight-editor',
    component: FreightEditorComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  constructor() {
    console.log('OrdersRoutingModule loaded.');
  }
}
