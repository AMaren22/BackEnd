import path from "path";
import fs from 'fs'
import {ProductsType,CartType} from '../utils/globals'


class Files {
    constructor (){
        
    }

    async readFile(pathFile:string){
        try{
            const filePath:string = path.resolve(__dirname,`../../${pathFile}.json`)
            const fileData = await fs.promises.readFile(filePath, "utf-8");
            const dataJson = JSON.parse(fileData);
            return dataJson;
        }catch(error){
            console.log(error)
        }
    }
    async saveFile(dataObj: [ProductsType]|[CartType], pathFile:string){
        try{
            const filePath = path.resolve(__dirname,`../../${pathFile}.json`)
            const data = JSON.stringify(dataObj, null, "\t");
            await fs.promises.writeFile(filePath, data);
        }catch(error){
            console.log(error)
        }
    }

    validationBody(body:ProductsType){
        if(
            !body.nombre ||
            !body.codigo || typeof body.codigo !== 'number' ||
            !body.precio || typeof body.precio !== 'number' ||
            !body.stock || typeof body.stock !== 'number'

        ){
            return false
        }else{
            return true
        }
    }
}

const filesManager = new Files()

export default filesManager