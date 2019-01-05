import { Component, OnInit, Input } from '@angular/core';
import { DgStateService } from '../../shared/dg-state.service';
import { ClrDatagridStateInterface } from "@clr/angular";

@Component({
  selector: 'app-dg-filters-state',
  templateUrl: './dg-filters-state.component.html',
  styleUrls: ['./dg-filters-state.component.css']
})
export class DgFiltersStateComponent implements OnInit {

  private filterDisplayStr:string;

  constructor(dgState: DgStateService) {
    this.filterDisplayStr = '[ няма ]';
    dgState.stateChanges.subscribe( (val:ClrDatagridStateInterface) => {
      this.updateFilterDisplayString(val);
    })
  }

  @Input() columnNameMap: { [key: string]: string; }

  ngOnInit() {
  }

  private updateFilterDisplayString(state: ClrDatagridStateInterface) {
    let filterStr = null;
    this.filterDisplayStr = '[ няма ]';

    if (state.filters) {
      filterStr = '[ ';
      for (let filter of state.filters) {
        let { property, value } = <{ property: string, value: string }>filter;
        filterStr = filterStr + this.nameMap(property) + ": " + value + "; "
      }
      filterStr = filterStr + ' ]'
      this.filterDisplayStr = filterStr;
    }
  }

  private nameMap(name: string): string {
    let val = null;
    if (this.columnNameMap && (val = this.columnNameMap[name])) {
      return val;
    } else {
      return name;
    }
  }

}
