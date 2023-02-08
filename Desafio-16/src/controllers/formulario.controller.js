import { getMessagesSqlite, getProducts } from "../services/db.service.js"


export const formController = async (req, res, next) =>{
    try{
        const name = req.user.email
        const dataJson = await getProducts()
        const messageJson = await getMessagesSqlite()
        res.render("formulario", { dataJson, messageJson, name })
    
    }catch (error) {
        next(error);
    }
}