export const dbOptions = {
    mysql:{
        client: "mysql2",
    connection:{
        host:'localhost',
        user:'root',
        password:'',
        database:'entrega07'
    }
    },
    sqlite:{
        client:'sqlite3',
    connection:{
        filename:'./DB/message.sqlite'
    },
    useNullAsDefault:true
    }
}