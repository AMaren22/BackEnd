import { buildSchema }from 'graphql'
import { getAllController, saveController } from '../../controllers/graphql/products.graphql.js'


export const graphqlSchema = buildSchema(`
    type Product{
        id: String!
        name: String
        price: Int
        code: String
        stock: Int
    }
    type Query{
        getAllController:[Product]
    }

    input ProductInput{
        name: String!
        price: Int!
        code: String!
        stock: Int!
    }

    type Mutation{
        saveController(data:ProductInput):Product
    }
`)

export const graphqlRoot = {
    getAllController,
    saveController
}