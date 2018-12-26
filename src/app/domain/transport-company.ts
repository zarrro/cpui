import { LegalEntity } from "./legal-entity";

export class TransportCompany extends LegalEntity {
    owned: boolean;
    isSpedition: boolean;
    isHauler: boolean;
}