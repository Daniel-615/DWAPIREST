const express = require("express");
const ClienteController = require("../controllers/cliente.controller.js");

class ClienteRoutes {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ClienteController(); 
    this.registerRoutes();
    app.use("/api/customer", this.router); 
  }

  registerRoutes() {
    this.router.post("/create/", this.controller.create);
    this.router.get("/findAll/", this.controller.findAll);
    this.router.get("/status/", this.controller.findAllStatus);
    this.router.get("/:id/", this.controller.findOne);
    this.router.put("/:id/", this.controller.update);
    this.router.delete("/:id/", this.controller.delete);
    this.router.delete("/delete/", this.controller.deleteAll);
  }
}

module.exports = ClienteRoutes;
