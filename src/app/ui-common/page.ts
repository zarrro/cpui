import { HttpResponse } from  '@angular/common/http';

export class Page {
    public current:number;
    public size:number;
    public totalItems:number;
    public firstIndex:number;
    public lastIndex:number;
}