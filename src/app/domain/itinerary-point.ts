import { Auditable } from "./auditable";
import { LegalEntity } from "./legal-entity";

export class ItineraryPoint extends Auditable {
    public id: number;
    public pointOrder: number;
    public loading: boolean;
    public unloading: boolean;
    public completed: boolean;
    public loadGoods: string;
    public unloadGoods: string;
    public completionDate: string;
    public notes: string;
    public legalEntity: LegalEntity;
}