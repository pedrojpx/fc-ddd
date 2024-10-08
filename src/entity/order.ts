import OrderItem from "./order_item";
export default class Order {
    _id: string;
    _customerId: string; //customer is a different aggregate, therefore it uses an Id reference
    _items: OrderItem[] = []; //OrderItem is part of the same aggregate, so it uses a reference to the entity directly


	constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
	}

}