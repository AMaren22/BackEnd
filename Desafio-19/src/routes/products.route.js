import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { getAllController, saveController } from '../controllers/products.controller.js'
import { graphqlRoot, graphqlSchema } from "../services/graphql/graphql.js";



const productRouter = Router()

productRouter.post('/save', saveController)
productRouter.get('/list', getAllController)
productRouter.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true
}))

export default productRouter