import { logger } from "../../../config/logs.config";
import { ProductsType } from "../../../utils/globals.interfaces";
import { ProductsModel } from "../schema/products.schema";

class ProductsDAO{
    constructor(){}

    async productCreate(newProduct: ProductsType){
        try{
            const product = await ProductsModel.create(newProduct)
            return product._id
        }catch(error){
            logger.error(error)
        }
    }
    async deleteProduct(id: string){
        try{
            return await ProductsModel.findByIdAndDelete(id)
        }catch(error){
            logger.error(error)
        }
    }
    async upgradeProduct(id: string, data: ProductsType){
        try{
            const { name, description, code, photo, price, stock } = data
            await ProductsModel.findByIdAndUpdate(
                id,
                {name, description, code, photo, price, stock},
                {new: true}
            )
        }catch(error){
            logger.error(error)
        }
    }
    async findProductById(id: string){
        try{
            const product = await ProductsModel.findById(id)
            return product
        }catch(error){
            logger.error(error)
        }
    }
    async getAllProducts() {
        try{
            return await ProductsModel.find()
        }catch(error){
            logger.error(error)
        }
    }
}

export const productDao = new ProductsDAO()