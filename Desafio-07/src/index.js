import server from "./services/server.js"
import initWsServer from "./routes/socket.js"
import { PORT } from "./config/global.js"

const init = async () =>{
    try{
        initWsServer(server)
    server.listen(PORT, () =>{
        console.log(`Server up: ${PORT}`)
})}
    catch (err){
        console.log(err)
    }
}
init()