import server from "./services/server.js"
import initWsServer from "./routes/socket.js"
import { PORT } from "./config/global.js"
import { initMongoDb } from "../DB/mongoConnect.js"

const init = async () =>{
    try{
        await initMongoDb()
        initWsServer(server)
    server.listen(PORT, () =>{
        console.log(`Server up: ${PORT}`)
})}
    catch (err){
        console.log(err)
    }
}
init()