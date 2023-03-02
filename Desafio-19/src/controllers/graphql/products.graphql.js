import { getAllProducts, saveProducts } from "../../services/graphql/products.services.graphql.js"


export const saveController = async ({data}) =>{
    try{
        console.log(data);
        const product = await saveProducts(data)
        return product
    }catch (error) {
        console.log(error);
    }
}

export const getAllController = async ()=>{
    try{
        const product = await getAllProducts()
        return product
    }catch (error) {
        console.log(error);
    }
}