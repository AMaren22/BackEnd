import ProductsRepositoryGraphql from "../../persistence/repository/graphql/graphql.repository.products.js";

const PR = new ProductsRepositoryGraphql()

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