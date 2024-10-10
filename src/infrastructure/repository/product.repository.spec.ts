import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"

describe("Product repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        sequilize.addModels([ProductModel])
        await sequilize.sync();
    })
    
    afterEach(async() => {
        await sequilize.close()
    })
})