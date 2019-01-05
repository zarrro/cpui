import { Component, OnInit, Input } from '@angular/core';
import { Freight } from 'src/app/domain/freight';
import { Page } from '../../../ui-common/page';

import { ItineraryPoint } from 'src/app/domain/itinerary-point';
import { Address, City, Country } from 'src/app/domain/legal-entity';
import { DgStateService } from '../../shared/dg-state.service';
import { ClrDatagridStateInterface } from "@clr/angular";


@Component({
  selector: 'freight-list',
  templateUrl: './freight-list.component.html',
  styleUrls: ['./freight-list.component.css'],
  providers: [DgStateService]
})
export class FreightListComponent implements OnInit {

  @Input() private freights: Freight[];
  @Input() private pageSize: number;
  @Input() private pageLoading: boolean = true;

  private columnNames: { [key: string]: string; } = {
    'id': 'ID',
    'orderId': 'Заявка',
    'status': 'Статус',
    'subOrder': 'Под-поръчка',
    'startDate': 'Начална дата',
    'points': 'Маршрут',
    'price': 'Цена',
    'driver': 'Шофьор',
    'auto': 'Кола',
    'trailer': 'Ремарке',
    'createdAt': 'Кола/Ремарке'
  }

  private page: Page;

  constructor(private dgState: DgStateService) {
    this.page = new Page();
  }

  ngOnInit() {
    this.page.size = this.pageSize;
    this.page.totalItems = this.freights.length;

  }

  refresh(state: ClrDatagridStateInterface) {
    this.dgState.push(state);
  }

  private pointShortStr(point: ItineraryPoint): string {
    let addr: Address = point.legalEntity.address;
    return addr.city.name + ' ( ' + addr.city.country.name + ' ) - ' + this.cargoStr(point);
  }

  private cargoStr(point: ItineraryPoint): string {
    return ((point.loading) ? 'товарене: ' + point.loadGoods : '') +
      ((point.unloading ? 'разтоварване: ' + point.unloadGoods : ''));
  }
}
