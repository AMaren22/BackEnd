import { logger } from "../config/logs.config";
import { productDao } from "../DB/mongoDB/daos/product.dao";
import { ProductsType } from "../utils/globals.interfaces";


class ProductService{
    constructor(){}

    async getProductById(id: string){
        try{
            return await productDao.findProductById(id)
        }catch(error){
            logger.error(error)
        }
    }
    async saveProduct(data: ProductsType){
        try{
            const { name, description, code, photo, price, stock} = data
            const newProduct: ProductsType = {
                name,
                description,
                code,
                photo,
                price,
                stock,
                
            }
            return await productDao.productCreate(newProduct)
        }catch(error){
            logger.error(error)
        }
    }
    async deleteProduct(id: string){
        try{
            return await productDao.deleteProduct(id)
        }catch(error){
            logger.error(error)
        }
    }
    async upgradeProduct(id: string, data: ProductsType){
        try{
            return await productDao.upgradeProduct(id, data)
        }catch(error){
            logger.error(error)
        }
    }
    async getAllProducts(){
        try{
            return await productDao.getAllProducts()
        }catch(error){
            logger.error(error)
        }
    }
}

export const productService = new ProductService()