import moment from "moment";
import { Server } from "socket.io";
import { sqLiteDb } from "../db/SqLite/sqlite.js";
import { createProduct, getLastProduct} from "../db/mongoDB/mongodb.js";

const initWsServer = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New connection established");

    socket.on("addProduct", async (product) => {
      try {
        const newProduct = {
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        };
        await createProduct(newProduct)
        const lastProduct = await getLastProduct()
        io.emit("addTable", ...lastProduct);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("newMessage", async (message) => {
      try {
        const newMessage = {
          email: message.email,
          msg: message.msg,
          time: moment().format("h:mm a"),
        };
        await sqLiteDb.insertData(newMessage);
        io.emit("renderMessage", newMessage);
      } catch (error) {
        console.log(error);
      }
    });
  });
  return io;
};
export default initWsServer;
