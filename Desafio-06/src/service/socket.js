const socketIO = require('socket.io')
const {saveFile,readFile,validateBody} = require('../controllers/files')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment/moment');

let io;

const initWsServer = (server) =>{
    io = socketIO(server)

    io.on('connection', (socket) =>{
        console.log('Nueva Conexion establecida')


        socket.on('addProduct', async (product) =>{
            try{
                product.price = Number(product.price);
    
                validateBody(product);
    
                const dataJson = await readFile('productos');
    
                const newProduct = {
                id: uuidv4(),
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                };
    
                dataJson.push(newProduct);
    
                io.emit('addTable', dataJson[dataJson.length-1])
    
                await saveFile(dataJson,'productos');

            }catch (error){
                console.log(error);
            }
        })

        socket.on('newMessage', async (message) =>{
            try{
                const messageJson = await readFile('messages')
                const newMessage  = {
                    email: message.email,
                    msg: message.msg,
                    time: moment().format('h:mm a')
                }
                messageJson.push(newMessage)
    
                io.emit('renderMessage', messageJson[messageJson.length-1])
    
                await saveFile(messageJson,'messages')
            }catch(error){
                console.log(error);
            }
        })
    })
return io
}

module.exports = initWsServer