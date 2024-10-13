import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"
import CustomerModel from "../db/sequelize/model/customer.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"
import Product from "../../domain/entity/product"
import OrderItem from "../../domain/entity/order_item"
import Order from "../../domain/entity/order"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        sequilize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel])
        await sequilize.sync();
    })

    afterEach(async() => {
        await sequilize.close()
    })
    
    it("should create a new order", async() => {
        
        const customerRepo = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepo.create(customer)

        const prodRepo = new ProductRepository()
        const product = new Product("1", "product 1", 100)
        await prodRepo.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem])
        const orderRepo = new OrderRepository()
        await orderRepo.create(order)

        const model = await OrderModel.findOne({ where: {id: order.id}, include: ["items"] })

        expect(model.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    order_id: "1",
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId
                }
            ]
        })
    })
})