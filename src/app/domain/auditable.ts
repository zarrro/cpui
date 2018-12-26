import { User } from "./user";

export class Auditable {
    creationDate:string;
    createdBy:User;
    lastModifiedBy:User;
    lastModifiedDate:string;
}