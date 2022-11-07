import { PUERTO } from './config';
import server from './services/server'

server.listen(PUERTO, ():void =>{
    console.log(`Server up : ${PUERTO}`);
    
})