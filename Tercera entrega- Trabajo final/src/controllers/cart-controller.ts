import { logger } from "../config/logs.config";
import { CartsModel } from "../models/carts-model";
import { ProductsModel } from "../models/products-model";
import { sendMailEthereal } from "../services/email.service";
import { sendSMS, sendWPP } from "../services/twilio.service";
import { CartType, ProductsType } from "../utils/globals";
import { currentUser } from "./user.controller";

class Cart {
  constructor() {}

  async createCart() {
    try {
      const newCart: CartType = {
        timestap: new Date().toLocaleString(),
        productos: [],
      };
      const cart = await CartsModel.create(newCart);
      return cart?._id.toString()
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteCart(id: string) {
    try {
      await CartsModel.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
    }
  }
  async productsByCartId(id: string) {
    try {
      const cart = await CartsModel.findById(id);
      const products = await cart?.populate("productsID");
      return products?.productsID;
    } catch (error) {
      logger.error(error);
    }
  }
  async addProductToCart(idCart: string, idProduct: string) {
    try {
      const cart = await CartsModel.findById(idCart);
      const product = await ProductsModel.findById(idProduct);
      if (product === null || cart === null) {
        throw new Error("No existe el producto o el carrito seleccionado");
      } else {
        cart.productsID.push(product._id);
      }
      await CartsModel.create(cart);
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteProductToCart(idCart: string, idProduct: string) {
    try {
      const cart = await CartsModel.findById(idCart);
      if (cart === null) {
        throw new Error("No existe el carrito seleccionado");
      } else {
        const index = cart.productsID.findIndex(
          (id) => id.toString() === idProduct
        );
        if(index < 0){
          throw new Error('El producto NO existe')
        }
        cart.productsID.splice(index, 1);
        await CartsModel.create(cart); 
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async buyCart (idCart:string) {
    try{
      const cart = await CartsModel.findById(idCart)
      const products = await cart?.populate("productsID");
      const allProducts = products?.productsID

      await sendMailEthereal(`Nuevo pedido de: ${currentUser.name}, Mail:  ${currentUser.email}`, allProducts?.toString())
      if(currentUser.phone){
       await sendSMS(currentUser.phone)
       await sendWPP(`Se recibio una compra de ${currentUser.name}, registrado con el email ${currentUser.email}. \n Adquirió los siguientes productos: ${allProducts?.toString()}`)
      }else{
        logger.error('Falta número de telefono, no se puede enviar mensaje')
      }
      await cartManager.deleteCart(idCart)
      return logger.info('TODO OK')
    }catch(error){
      logger.error(error)
    }
  }
}



const cartManager = new Cart();

export default cartManager;
