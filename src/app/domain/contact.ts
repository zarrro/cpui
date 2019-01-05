export class Contact {
    public firstName:string;
    public lastName:string;
    public phone:string;

    get names() {
        return this.firstName + ' ' + this.lastName;
    }

}