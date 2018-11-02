import { Company } from './company';

export class Order {
    id:number;
    customer:Company;
    // state:string;
    contractor:Company;
    goods:string;
    type:string;
    deadline:string;
    createdAt:string;
    updatedAt:string;
}
