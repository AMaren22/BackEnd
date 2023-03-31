import { logger } from "../config/logs.config";
import { currentUser } from "../controllers/user.controller";
import { cartDao } from "../DB/mongoDB/daos/cart.dao";
import { productDao } from "../DB/mongoDB/daos/product.dao";
import { orderDao } from "../DB/mongoDB/daos/order.dao";
import { CartType, ProductsType } from "../utils/globals.interfaces";
import { sendMailEthereal } from "./email.service";
import { orderService } from "./order.service";
import { sendSMS, sendWPP } from "./twilio.service";
import { productsDto } from "../DB/mongoDB/dto/products.dto";


class CartService{
    constructor(){}

    async createCart(){
        try{
            const newCart: CartType = {
                timestap: new Date().toLocaleString(),
                productos: []
            }
            return await cartDao.create(newCart)
        }catch(error){
            logger.error(error)
        }
    }
    async deleteCart(id:string){
        try{
            return await cartDao.deleteCart(id)
        }catch(error){
            logger.error(error)
        }
    }
    async productsByCartId(id:string){
        try{
            return cartDao.productsByCartId(id)
        }catch(error){
            logger.error(error)
        }
    }
    async addProductToCart(id_cart: string, id_product: string){
        try{
            const cart = await cartDao.findCartByID(id_cart)
            const product = await productDao.findProductById(id_product)           
                        
            if( cart === null || product === null || !cart || !product){
                return false;
            }else{                
                cart.productsID.push(product._id)
            }
            await cartDao.create(cart)
            return true
        }catch(error){
            logger.error(error)
        }
    }
    async deleteProductToCart(id_cart: string, id_product: string){
        try{
            const cart = await cartDao.findCartByID(id_cart)
            if(cart === null || !cart){
                return false;
            }else{
                const index = cart.productsID.findIndex((id) => id.toString() === id_product)
                if(index < 0){
                    return false            
                }
                cart.productsID.splice(index, 1)
                await cartDao.create(cart)
                return true
            }
        }catch(error){
            logger.error(error)
        }
    }
    async buyCart(id_cart: string){
        try{
            if(!currentUser.email){
                return false
            }
            const cart = await cartDao.findCartByID(id_cart)
            const order = await orderService.createOrder(currentUser.email)
            if(cart === undefined || cart=== null || order=== undefined){
                return false
            }
            const products = await cart?.populate("productsID")
            const allProducts = products?.productsID
            const getProductsDto = productsDto(products.productsID)
            order.products.push(getProductsDto)
            const productsString = JSON.stringify(getProductsDto,null, "\t")                     
            if(allProducts){                
                await sendMailEthereal(`Nuevo pedido de: ${currentUser.name}, mail: ${currentUser.email}`, `${productsString}`)
            }
            if(currentUser.phone){
                await sendSMS(currentUser.phone)
                await sendWPP(currentUser.phone,`Se recibio una compra de ${currentUser.name}, registrado con el email ${currentUser.email}. \n Generó la siguiente orden: ${productsString}`)
            }else{
                logger.error('Falta número de telefono, no se puede enviar mensaje')
            }
            
            await orderDao.createOrder(order)
            await cartDao.deleteCart(id_cart)
            logger.info('Compra Exitosa')
            return getProductsDto
        }catch(error){
            logger.error(error)
        }
    }
}

export const cartService = new CartService()