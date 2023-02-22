import { getAllProducts, saveProducts } from "../services/products.service.js"


export const saveController = async (req, res) =>{
    const { body } = req
    try{
        const product = await saveProducts(body)
        res.json(product)
    }catch (error) {
        console.log(error);
    }
}

export const getAllController = async (req, res) =>{
    try{
        const product = await getAllProducts()
        res.json(product)
    }catch (error) {
        console.log(error);
    }
}