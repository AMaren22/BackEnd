import { Router } from "express";
import productsRouter from "./product";
import cartRouter from "./cart";

const mainRouter:Router = Router()

mainRouter.use('/productos', productsRouter)
mainRouter.use('/carrito', cartRouter)


export default mainRouter