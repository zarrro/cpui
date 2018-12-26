import { LegalEntity } from './legal-entity';
import { TransportCompany } from './transport-company';
import { Auditable } from './auditable';

export class Order extends Auditable {
    id: number;
    status: string;
    customer: LegalEntity;
    contractor: TransportCompany;
}
