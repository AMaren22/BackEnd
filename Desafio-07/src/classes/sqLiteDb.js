import knex from "knex"
import { dbOptions } from "../options/db.js"

class Db {
    constructor(){
        const config = dbOptions['sqlite']
        this.knex = knex(config)
    }
    async createTables(){
        try{
            await this.knex.schema.dropTableIfExists('message')
            await this.knex.schema.createTable('message', table =>{
                table.increments('id').primary()
                table.string('email', 100).notNullable()
                table.string('msg', 2000).notNullable()
                table.string('time',50).notNullable()
            })
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            return await this.knex.from('message').select('*')
        }catch(error){
            console.log(error);
        }
    }
    async insertData(data){
        try{
            return await this.knex('message').insert(data)
        }catch(error){
            console.log(error);
        }
    }

}
export const sqLiteDb = new Db() 