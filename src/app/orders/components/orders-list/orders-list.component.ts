import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../domain/order';
import { Page } from '../../../ui-common/page';

import { ClrDatagridStateInterface } from "@clr/angular";


@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  private page: Page;
  @Input() private orders:Order[];
  @Input() private pageSize:number;
  @Input() private pageLoading:boolean = true;

  private filterStr: string;

  constructor() {
    this.page = new Page();
    this.filterStr = 'няма';
  }

  ngOnInit() {
    this.page.size = this.pageSize;
    this.page.totalItems = this.orders.length;
  }

  refresh(state: ClrDatagridStateInterface) {
    this.updateFilterDisplayString(state);
  }

  private updateFilterDisplayString(state: ClrDatagridStateInterface) {
    this.filterStr = '[ няма ]';
    if (state.filters) {
      this.filterStr = '[ ';
      for (let filter of state.filters) {
        let { property, value } = <{ property: string, value: string }>filter;
        this.filterStr = this.filterStr + this.columnName(property) + ": " + value + "; "
      }
      this.filterStr = this.filterStr + ' ]'
    }
  }

  private columnName(fieldName: string): string {
    switch (fieldName) {
      case 'id': {
        return 'ID';
      }
      case 'customer.name': {
        return 'Клиент';
      }
      case 'contractor.name': {
        return 'Изпълнител';
      }
      case 'goods': {
        return 'Товар';
      }
      case 'type': {
        return 'Тип';
      }
      case 'deadline': {
        return 'Краен срок';
      }
      case 'createdAt': {
        return 'Създадена на';
      }
      default: {
        return 'error'
      }
    }
  }
}