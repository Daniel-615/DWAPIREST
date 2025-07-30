const express= require("express");
const ProductoController= require("../controllers/producto.controller.js");
class ProductoRoutes{
    constructor(app){
        this.router=express.Router();
        this.controller=new ProductoController();
        this.registerRoutes();
        app.use("/api/product",this.router);
    }
    registerRoutes(){
        this.router.post("/",this.controller.create);
        this.router.get("/findAll/",this.controller.findAll);
        this.router.get("/:id",this.controller.findOne);
        this.router.put("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);
    }
}
module.exports=ProductoRoutes;