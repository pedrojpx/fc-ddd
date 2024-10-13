import Order from "../../domain/entity/order";
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
            model = await OrderModel.findOne({ where: {id: id}, rejectOnEmpty: true})
        } catch (error) {
            throw new Error("Customer not found")
        }
        return this.modelToEntity(model)
    }
    
    async findAll(): Promise<Order[]> {
        throw Error("not implemented")
        
    }

    private modelToEntity(model: OrderModel): Order {
        throw Error("not implemented")
    }
    
    async update(entity: Order): Promise<void> {
        throw Error("not implemented")
    }
}