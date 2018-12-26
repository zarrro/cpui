import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MessageService } from '../message.service';
import { ViewChild } from '@angular/core';
import { ClrModal } from '@clr/angular';
import { Order } from '../domain/order';
import { Page } from '../ui-common/page';

import { ClrDatagridStateInterface } from "@clr/angular";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private page: Page<Order>;
  private loading: boolean = true;
  private filterStr: string;

  @ViewChild('addOrderModal')
  private orderEditorModal: ClrModal;

  @ViewChild('addInvoiceModal')
  private addInvoiceModal: ClrModal;

  constructor(private orderService: OrderService, private messageService: MessageService) {
    this.page = new Page();
    this.page.items = [];
    this.filterStr = 'няма';
  }

  ngOnInit() {
    this.initOrders();
  }

  initOrders(): void {
    //server side paging is ignored
    this.orderService.getOrdersPage(0, 0).subscribe((result: Page<Order>) => {
      this.page = result;
      this.loading = false;
      console.log('orders acquired: ' + this.page.items.length)
    })
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
