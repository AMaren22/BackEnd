import filesManager from "./files";
import {ProductsType} from '../utils/globals'
import {v4 as uuidv4} from 'uuid'



class Products {
    constructor(){
    }

    async getProductoById (id:string){
        try{
            const dataJson:[] = await filesManager.readFile('products')
            const index:number = dataJson.findIndex((itemId:ProductsType) => itemId.id === id)
            
    
            if(index < 0){
                throw 'El producto no existe'
            }
    
            return dataJson[index]
        }catch(error){
            console.log(error);
        }
    } 
    async saveProduct(data:ProductsType){
        try{
            const dataJson:[ProductsType] = await filesManager.readFile('products');
            const newProduct:ProductsType = {
                id:uuidv4(),
                timestamp: new Date().toLocaleString(),
                nombre: data.nombre,
                descripcion:data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: data.precio,
                stock: data.stock
            }
    
            dataJson.push(newProduct)
    
            await filesManager.saveFile(dataJson,'products')
        }catch(error){
            console.log(error);
        }
    }
    async deleteProduct(id:string){
        try{
            const dataJson:[ProductsType] = await filesManager.readFile('products')
            const index:number = dataJson.findIndex((itemId:ProductsType) => itemId.id === id)
            if(index < 0){
                throw 'El producto no existe'
            }
            dataJson.splice(index,1)
            await filesManager.saveFile(dataJson,'products')
    
        }catch(error){
            console.log(error);
            
        }
    }
    async upgradeProduct(id:string,data:ProductsType){
        const dataJson:[ProductsType] = await filesManager.readFile('products')
        const index:number = dataJson.findIndex((itemId:ProductsType) => itemId.id === id)
        if(index < 0){
                throw 'El producto no existe'
        }

        dataJson[index] = {
            id,
            timestamp: new Date().toLocaleString(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: data.precio,
            stock: data.stock
        }
        await filesManager.saveFile(dataJson,'products')

    }
    

}

const productManager = new Products()

export default productManager