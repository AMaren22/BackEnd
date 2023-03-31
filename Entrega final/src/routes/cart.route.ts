import { Router } from "express";
import { addProductToCart, buyCart, createCart, deleteCart, deleteProductToCart, getProductsByCartID } from "../controllers/cart.controller";
import { isLoggedIn } from "../middleware/auth.middleware";

const cartRouter = Router()

cartRouter.post('/', createCart)
cartRouter.delete('/:id', deleteCart)
cartRouter.get('/:id/productos', getProductsByCartID)
cartRouter.get('/:id/buy', isLoggedIn, buyCart)
cartRouter.post('/:id/productos', addProductToCart)
cartRouter.delete('/:id/productos/:id_prod', deleteProductToCart)

export default cartRouter