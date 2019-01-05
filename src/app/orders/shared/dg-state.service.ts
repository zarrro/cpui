import { Injectable } from "@angular/core";
import { ClrDatagridStateInterface } from "@clr/angular";
import { Subject } from 'rxjs';

@Injectable()
export class DgStateService {

    // Observable string sources
    private changes:Subject<ClrDatagridStateInterface> = new Subject<ClrDatagridStateInterface>();

    public push(state:ClrDatagridStateInterface) {
        this.changes.next(state);
    }

    get stateChanges():Subject<ClrDatagridStateInterface> {
        return this.changes;
    }
}