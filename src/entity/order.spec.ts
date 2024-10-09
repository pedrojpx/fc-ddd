import Order from './order'
import OrderItem from './order_item'

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", [])  
        }).toThrow("Id is required")
    
    })

    it("should throw error when customerId is empty", () => {

        expect(() => {
            let order = new Order("123", "", [])  
        }).toThrow("customerId is required")
    
    })

    it("should throw error when item quantity is not greater than 0", () => {

        expect(() => {
            let order = new Order("123", "123", [])  
        }).toThrow("item quantity must be greater than 0")
    
    })

    it("should calculate total", () => {

        //arrange
        const item1 = new OrderItem("i1", "item1", 100)
        const item2 = new OrderItem("i2", "item2", 150)

        const order = new Order("123", "123", [item1])
        let total = order.total()

        expect(total).toBe(100)

        const order2 = new Order("123", "123", [item1, item2])
        total = order2.total()

        expect(total).toBe(250)
    
    })

})  