import DaoFile from "./dao.filesystem/dao.filesystem.js"
import DaoMemory from "./dao.memory/dao.memory.js"
import DaoMongoDb from './dao.mongo/dao.mongoDb.js'
import { productsSchema } from "./dao.mongo/schema/products.schema.js"

let dao 
let argv = process.argv[2]

switch(argv){
    case 'file':
        dao = new DaoFile('./src/persistence/daos/dao.filesystem/db.json')
        break;
    case 'memory':
        dao = new DaoMemory()
        break
    default:
        dao = new DaoMongoDb('products', productsSchema)
        dao.initMongoDb()
        break;
       
}

export async function save(obj) {
    return await dao.save(obj);
};

export async function getAll() {
    return await dao.getAll();
};

export function getDao(){
    return dao;
};