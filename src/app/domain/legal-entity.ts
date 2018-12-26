import { Contact } from "./contact";
import { Auditable } from "./auditable";

export class LegalEntity extends Auditable {
    id: string;
    legalId: string;
    companyName: string;
    contact: Contact;
}