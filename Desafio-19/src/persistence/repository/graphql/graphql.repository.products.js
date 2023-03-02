import { getDao } from '../../daos/factory.js'

export default class ProductsRepositoryGraphql{
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
            return products
        }catch(error){
            console.log(error);
        }
    }
}