import { Contact } from "./contact";
import { Auditable } from "./auditable";

export class Country {
    public code: String;
    public name: String;
}

export class City {
    public id: number;
    public country: Country;
    public name: string;
}

export class Address {
    public city: City;
    public zipCode: string;
    public addressLine: string;
}

export class LegalEntity extends Auditable {
    id: string;
    legalId: string;
    companyName: string;
    contact: Contact;
    address: Address
}