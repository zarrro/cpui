import { HttpResponse } from  '@angular/common/http';

export class Page<T> {
    current:number;
    size:number;
    totalItems:number;
    firstIndex:number;
    lastIndex:number;
    items:T[];

    static fromHttpResponse<T>(response:HttpResponse<T[]>):Page<T> {
        let result:Page<T> = new Page();
        result.items = response.body;
        console.log("><><><> " + result.items);
        console.log(response.headers.get('link'));
        return result;
    }
}