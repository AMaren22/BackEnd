import { logger } from "../../../config/logs.config";
import { CartType } from "../../../utils/globals.interfaces";
import { CartModel } from "../schema/carts.schema";

class CartDAO {
    constructor(){}
    async create(newCart:any){
        try{
            const cart = await CartModel.create(newCart)
            return cart?._id.toString()
        }catch(error){
            logger.error(error)
        }
    }
    async deleteCart(id:string){
        try{
            return await CartModel.findByIdAndDelete(id)
        }catch(error){
            logger.error(error)
        }
    }
    async productsByCartId(id: string){
        try{
            const cart = await CartModel.findById(id);
            const products = await cart?.populate("productsID")
            return products?.productsID
        }catch(error) {
            logger.error(error);
        }
    }
    async findCartByID(id:string){
        try{
            const cart = await CartModel.findById(id)
            return cart
        }catch(error){
            logger.error(error)
        }
    }


}

export const cartDao = new CartDAO()