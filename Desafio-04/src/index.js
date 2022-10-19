const server = require('./service/server')

const PUERTO = 8080;

server.listen(PUERTO, () =>{
    console.log(`Estas trabajando en el puerto: ${PUERTO}`)
})