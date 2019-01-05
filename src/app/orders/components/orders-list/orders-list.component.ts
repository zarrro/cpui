import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../domain/order';
import { Page } from '../../../ui-common/page';
import { DgStateService } from '../../shared/dg-state.service';

import { ClrDatagridStateInterface } from "@clr/angular";

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [DgStateService]
})
export class OrdersListComponent implements OnInit {

  @Input() private orders: Order[];
  @Input() private pageSize: number;
  @Input() private pageLoading: boolean = true;

  private page: Page;
  private columnNames: { [key: string]: string; } = {
    'id':'ID',
    'customer.companyName':'Клиент',
    'contractor.companyName':'Изпълнител',
    'goods':'Товар',
    'type':'Тип',
    'createdAt':'Създадена на'
  }

  constructor(private dgState: DgStateService) {
    this.page = new Page();
  }

  ngOnInit() {
    this.page.size = this.pageSize;
    this.page.totalItems = this.orders.length;
  }

  refresh(state: ClrDatagridStateInterface) {
    this.dgState.push(state);
  }  
}