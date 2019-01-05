import { Auditable } from "./auditable";
import { Contact } from "./contact";

export class Driver extends Auditable {
    public id:number;
    public contact:Contact;
    public employerId:number;
}