import { logger } from "../config/logs.config";
import { orderDao } from "../DB/mongoDB/daos/order.dao";
import { OrderType } from "../utils/globals.interfaces";

class OrderService{
    constructor(){}

    async createOrder (email: string){
        try{
            const newOrder: OrderType = {
                email: email,
                products: []
            }
            return await orderDao.createOrder(newOrder)
        }catch(error){
            logger.error(error)
        }
    }
}

export const orderService = new OrderService()