const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const ClienteRoutes = require("./app/routes/cliente.routes");
const ProductoRoutes= require("./app/routes/producto.routes")
const PedidoRoutes = require("./app/routes/pedido.routes");
const DetallePedidoRoutes = require("./app/routes/detalle_pedido.routes");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 8081;

    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    const corsOptions = {
      origin: "http://localhost:8081"
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  configureRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "UMG Web Application" });
    });

    new ProductoRoutes(this.app);
    new ClienteRoutes(this.app);
    new PedidoRoutes(this.app);
    new DetallePedidoRoutes(this.app);

      // const TutorialRoutes = require("./app/routes/tutorial.routes");
      // new TutorialRoutes(this.app);
  } 

  async connectDatabase() {
    try {
      await db.sequelize.sync();
      console.log("Base de datos sincronizada correctamente.");
    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
