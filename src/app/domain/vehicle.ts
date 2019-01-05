import { Auditable } from "./auditable";
import { TransportCompany } from "./transport-company";
import { Model } from "./model";

export class Vehicle extends Auditable {
    public id:number;
    public owner:TransportCompany;
    public plateNumber:string;
    public frameNumber:string;
    public model:Model;
    public year:number;
    //todo: add the rest of the properties
}