import { Sequelize } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
            
        },
        {
            include: [{model: OrderItemModel}],   
        })
    }    
    
    async find(id: string): Promise<Order> {
        let model
        try {
            model = await OrderModel.findOne({ where: {id: id}, rejectOnEmpty: true, include: [{model: OrderItemModel, as: 'items'}]})
        } catch (error) {
            throw new Error("Customer not found")
        }
        return this.modelToEntity(model)
    }
    
    async findAll(): Promise<Order[]> {
        const models = await OrderModel.findAll({include: [{model: OrderItemModel, as: "items"}]})
        return models.map((model) => this.modelToEntity(model))
    }

    private modelToEntity(model: OrderModel): Order {
        const items = model.items.map((model) => new OrderItem(model.id, model.name, model.price, model.product_id, model.quantity))
        const order = new Order(model.id, model.customer_id, items)
        return order
    }
    
    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            },
            {
                where: {
                    id: entity.id
                },
            }
        )
    }
}