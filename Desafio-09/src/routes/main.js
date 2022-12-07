import { Router } from "express";
import normalizeRoute from "./normalizer-route.js";
import productsRouter from "./products-test.js";

const mainRouter = Router()

mainRouter.use('/productos-test', productsRouter)
mainRouter.use('/messages', normalizeRoute)

export default mainRouter