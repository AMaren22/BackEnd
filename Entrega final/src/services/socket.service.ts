import { Server } from "socket.io"
import { logger } from "../config/logs.config"
import { currentUser } from "../controllers/user.controller"
import { messageDao } from "../DB/mongoDB/daos/message.dao"
import { MessagesType } from "../utils/globals.interfaces"

const initWsServer = (server:any) =>{
    const io = new Server(server)

    io.on('connection', (socket) =>{
        logger.info("New connection established")

        socket.on("newMessage", async (message: MessagesType) =>{
            try{
                if(currentUser.admin){
                    message.type = 'Sistema'
                }else{
                    message.type = 'Usuario'
                }
                const newMessage = {
                    email: message.email,
                    message: message.message,
                    type: message.type,
                    timestamp: new Date().toLocaleString()
                };
                await messageDao.createMessage(newMessage)
                io.emit("renderMessage", newMessage)
            }catch(error){
                logger.error(error)
            }
        })
    })
    return io
}
export default initWsServer