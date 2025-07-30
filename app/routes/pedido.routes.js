const express= require("express");
const PedidoController= require("../controllers/pedido.controller.js");
class PedidoRoutes{
    constructor(app){
        this.router=express.Router();
        this.controller=new PedidoController();
        this.registerRoutes();
        app.use("/api/order",this.router);
    }
    registerRoutes(){
        this.router.post("/create/",this.controller.create);
        this.router.get("/findAll/",this.controller.findAll);
        this.router.get("/:id",this.controller.findOne);
        this.router.put("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);
    }
}
module.exports= PedidoRoutes;