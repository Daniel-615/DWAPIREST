const express=require("express");
const DetallePedidoController=require("../controllers/detalle_pedido.controller.js");
class DetallePedidoRoutes{
    constructor(app){
        this.router=express.Router();
        this.controller=new DetallePedidoController();
        this.registerRoutes();
        app.use("/api/order-detail",this.router);
    }
    registerRoutes(){
        this.router.post("/",this.controller.create);
        this.router.get("/findAll/",this.controller.findAll);
        this.router.get("/:id",this.controller.findOne);
        this.router.put("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);
    }
}
module.exports=DetallePedidoRoutes;