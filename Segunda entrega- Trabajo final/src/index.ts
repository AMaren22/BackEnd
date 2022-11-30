import { PORT } from './config';
import server from './services/server'


const init = async() => {
    try{
        server.listen(PORT, ():void =>{
            console.log(`Server up : ${PORT}`);
            
        })
    }catch(error){
        console.log(error);
        
    }
}

init()