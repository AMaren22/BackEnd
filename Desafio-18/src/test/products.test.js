import mongoose from "mongoose";
import app from "../index.js";
import request from "supertest";
import { ProductsModel } from "../persistence/daos/dao.mongo/schema/products.schema.js";

describe('Product server test', () =>{
    beforeEach(async () =>{
        await mongoose.connection.collections['products'].drop()
    })

    it('Create new product', async () =>{
        const data = {
            name: "PC JEST",
            price: 300000,
            code: "PcJ0001",
            stock: 10
        }

        const response = await request(app).post('/api/save').send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe(data.name)
        expect(response.body.price).toBe(data.price)
    })

    it('Get all products', async () =>{
        const data = {
            name: "PC JEST 2",
            price: 300000,
            code: "PcJ0002",
            stock: 10
        }

        await ProductsModel.create(data)
        const response = await request(app).get('/api/list')

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
        expect(response.body[0].name).toBe(data.name)
        expect(response.body).toBeInstanceOf(Array)

    })
})

