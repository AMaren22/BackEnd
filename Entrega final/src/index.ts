import { config } from './config/config'
import { logger } from './config/logs.config'
import { initMongoDb } from './DB/mongoDB/mongo'
import server from './services/server.service'
import initWsServer from './services/socket.service'

const init = async () =>{
    try{
        await initMongoDb()
        initWsServer(server)
        server.listen(config.PORT, ():void =>{
            logger.info(`Server up ${config.PORT}`)
        })
    }catch(error){
        logger.error(error);
        
    }
}
init()