import { TransportCompany } from "./transport-company";

export class SubOrder {
    public id:number;
    public contractor:TransportCompany;
    public totalCost:number;
    public notes:string;
    public paymentDue:string;
}