import { SubOrder } from './sub-order';
import { Auto } from './auto';
import { Driver } from './driver';
import { Trailer } from './trailer';
import { Invoice } from './invoice';
import { ItineraryPoint } from './itinerary-point';

export class Freight {
    public id:number;
    public status:string;
    public subOrder:SubOrder;
    public startDate:string;
    public deadline:string;
    public price:number;
    //the cost paid to the subcontractor
    public cost:number;
    public auto:Auto;
    public driver:Driver;
    public trailer:Trailer;
    public invoice:Invoice;
    public nextPointIndex:number;
    public points:ItineraryPoint[];
    public orderId:number;
}