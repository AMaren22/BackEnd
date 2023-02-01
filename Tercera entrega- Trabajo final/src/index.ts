import { PORT } from './config/index-config';
import os from "os";
import cluster from "cluster";
import { initMongoDB } from './db/database';
import server from './services/server'
import { args } from './config/process.config';
import { logger } from './config/logs.config';

const {modo} = args
const numsCPUs = os.cpus().length;


const init = async() => {
    try{
        await initMongoDB()
        server.listen(PORT, ():void =>{
            logger.info(`Server up : ${PORT}`);
        })
    }catch(error){
        logger.error(error);
        
    }
}

if (modo === "cluster" && cluster.isPrimary) {
    logger.info(`Cantidad de nucleos del sistema: ${numsCPUs}`);
    logger.info(`PID MASTER: ${process.pid}`);
    for (let i = 0; i < numsCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code) => {
      logger.info(`Worker ${worker.process.pid} with code ${code}`);
      cluster.fork();
    });
}else{
    init()
}
