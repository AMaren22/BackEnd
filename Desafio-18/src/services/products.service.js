import ProductsRepository from "../persistence/repository/products.repository.js";

const PR = new ProductsRepository()

export const saveProducts = async(data) =>{
    try{
        const product = await PR.save(data)
        return product
    }catch(error){
        console.log(error);
    }
}

export const getAllProducts = async() =>{
    try{
        const products = await PR.getAll()
        return products
    }catch(error){
        console.log(error);
    }
}