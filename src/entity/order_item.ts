export default class OrderItem {
    _id: string;
    _name : string; //we are simplifying things here... name and price could be an id reference to a Product aggregate
    _price: number;

    constructor(id: string, name:string, price:number) {
        this._id = id
        this._name = name
        this._price = price
    }

    get price() {
        return this._price
    }
}