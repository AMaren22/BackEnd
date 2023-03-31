import { logger } from "../../../config/logs.config";
import { OrderModel } from "../schema/orders.schema";

class OrderDAO{
    constructor(){}

    async createOrder(newOrder:any){
        try{
            return await OrderModel.create(newOrder)
        }catch(error){
            logger.error(error)
        }
    }
}

export const orderDao = new OrderDAO()