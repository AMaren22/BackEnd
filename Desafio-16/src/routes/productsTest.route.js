import { Router } from "express";
import { productsTestController } from "../controllers/productsTest.controller.js";

const productsRouter = Router()

productsRouter.get('/', productsTestController)

export default productsRouter;
