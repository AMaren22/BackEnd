const server = require('./service/server')

const PUERTO= 8080

server.listen(PUERTO, () =>{
    console.log(`Puerto levantado en : ${PUERTO}`);
})