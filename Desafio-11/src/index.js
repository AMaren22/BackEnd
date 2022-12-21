import server from "./services/server.js";
import initWsServer from "./routes/socket.js";
import { initMongoDb } from "../DB/mongoConnect.js";
import { config } from "./config/global.js";

const init = async () => {
  try {
    await initMongoDb();
    initWsServer(server);
    server.listen(config.PORT, () => {
      console.log(`Server up: ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
init();
