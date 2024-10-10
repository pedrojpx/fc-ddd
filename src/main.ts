import Customer from './domain/entity/customer'
import Address from './domain/entity/address'
import OrderItem from './domain/entity/order_item'
import Order from './domain/entity/order'

let customer = new Customer("123", "Pedro")
const address = new Address("Rua", 2, "1234", "MG")

customer.address = address
customer.activate()

const item1 = new OrderItem("1", "name1", 10, "p1", 2)
const item2 = new OrderItem("1", "name1", 25, "p2", 2)
const order = new Order("1", "123", [item1, item2])