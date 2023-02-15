import { Router } from "express";
import { getAllController, saveController } from '../controllers/products.controller.js'



const productRouter = Router()

productRouter.post('/save', saveController)
productRouter.get('/list', getAllController)

export default productRouter