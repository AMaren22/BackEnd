import { Router } from "express";
import { createProduct, DeleteProduct, getAllProducts, getProductsByID, upgradeProduct } from "../controllers/product.controller";
import { auth, isLoggedIn, sessionExist } from "../middleware/auth.middleware";


const productsRouter = Router()


productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductsByID)
productsRouter.post('/', isLoggedIn, auth, createProduct)
productsRouter.put('/:id', isLoggedIn, auth, upgradeProduct)
productsRouter.delete('/:id',isLoggedIn, auth,  DeleteProduct)

export default productsRouter