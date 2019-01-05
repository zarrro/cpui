import { Component, OnInit } from '@angular/core';
import { Freight } from 'src/app/domain/freight';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-freights',
  templateUrl: './freights.component.html',
  styleUrls: ['./freights.component.css']
})
export class FreightsComponent implements OnInit {

  private freights: Freight[];
  private loading: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.initFreights();
  }

  initFreights(): void {
    //server side paging is ignored
    this.orderService.getFreights().subscribe((result:Freight[]) => {
      this.freights = result;
      this.loading = false;
      console.log('freights acquired: ' + this.freights.length)
    })
  }
}
