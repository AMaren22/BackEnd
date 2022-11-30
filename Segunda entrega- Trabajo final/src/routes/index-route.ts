import { Router } from "express";
import productsRouter from "./product-route";
import cartRouter from "./cart-route";

const mainRouter:Router = Router()

mainRouter.use('/productos', productsRouter)
mainRouter.use('/carrito', cartRouter)


export default mainRouter