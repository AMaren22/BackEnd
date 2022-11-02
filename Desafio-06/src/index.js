const server = require('./service/server');
const initWsServer = require('./service/socket');

const PUERTO= 8080


const init = async () =>{
    try{
        initWsServer(server)
server.listen(PUERTO, () =>{
    console.log(`Puerto levantado en : ${PUERTO}`);
})
    }catch (err){
        console.log(err)
    }
}
init()