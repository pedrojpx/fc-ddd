import { Sequelize } from "sequelize-typescript"

describe("Product repository test", () => {

    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true} //criar tabelas e tal quando criar o banco
        })
        
        afterEach(async() => {
            await sequilize.close()
        })
    })
})