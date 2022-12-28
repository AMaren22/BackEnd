import knex from "knex"
import { dbOptions } from "../options/db.js"

class Db {
    constructor(){
        const config = dbOptions['mysql']
        this.knex = knex(config)
    }
    async createTables(){
        try{
            await this.knex.schema.dropTableIfExists('products')
            await this.knex.schema.createTable('products', table =>{
                table.increments('id').primary()
                table.string('title' , 50).notNullable()
                table.decimal('price').notNullable()
                table.string('thumbnail', 1000)
            })
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            return await this.knex.from('products').select('*')
        }catch(error){
            console.log(error);
        }
    }
    async insertData(data){
        try{
            return await this.knex('products').insert(data)
        }catch(error){
            console.log(error);
        }
    }
}
export const mySqlDb = new Db() 