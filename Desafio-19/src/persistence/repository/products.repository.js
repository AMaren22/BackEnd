import { getDao } from '../daos/factory.js'
import { asDto } from '../dto/products.dto.js'

export default class ProductsRepository{
    constructor(){
        this.dao = getDao()
    }

    async save(data) {
        try{
            const products = await this.dao.save(data)
            return products
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            const products = await this.dao.getAll()
            const productsDTO = asDto(products)
            return productsDTO
        }catch(error){
            console.log(error);
        }
    }
}