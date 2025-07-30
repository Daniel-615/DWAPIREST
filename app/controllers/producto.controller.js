const db= require("../models")
const Producto=db.getModel("Producto")
class ProductoController{
    async create(req,res){
        if(!req.body.nombre || !req.body.precio || !req.body.stock){
            return res
            .status(400)
            .send({
                message: "Se requiere nombre, precio y stock."
            })
        }
        const producto={
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock
        }
        try{
            const exist= await Producto.findOne({ where: { nombre: producto.nombre}})
            if(exist){
                return res
                .status(400)
                .send({
                    message: `El producto con nombre ${producto.nombre} ya existe.`
                })
            }
            const data= await Producto.create(producto)
            return res
            .status(201)
            .send({
                message: "Producto creado exitosamente.",
                data: data
            })
        }catch(err){
            return res
            .status(500)
            .send({
                message: err.message || "Error al crear el producto."
            })
        }

    }
    async findAll(req,res){
        const nombre=req.query.nombre;
    
        const condition= nombre? {nombre: {[ Op.iLike]: `%${nombre}%`}}: null;
        try{
            const data= await Producto.findAll({ where: condition});
            return res
            .status(200)
            .send({
                message: "Productos encontrados.",
                data: data
            })
        }catch(err){
            return res
            .status(500)
            .send({
                message: err.message || "Error al recuperar los productos."
            })
        }
    }   
    async findOne(req,res){
        const id=req.params.id;
        if(!id){
            return res
            .status(400)
            .send({
                message: "El ID del producto es requerido."
            })
        }
        try{
            const data= await Producto.findByPk(id);
            if(!data){
                return res
                .status(404)
                .send({
                    message: `Producto con id=${id} no encontrado.`
                })
            }
            return res
            .status(200)
            .send({
                message: "Producto encontrado.",
                data: data
            })
        }catch(err){
            return res
            .status(500)
            .send({
                message: `Error al recuperar el producto con id=${id}. ${err.message}`
            })
        }
    }
    async update(req,res){
        const id=req.params.id;
        if(!id){
            return res
            .status(400)
            .send({
                message: "El ID del producto es requerido para actualizar."
            })
        }
        try{
            const [updated]= await Producto.update(req.body, {where: {id_producto: id}})
            if(updated===1){
                return res
                .status(200)
                .send({
                    message: "Producto actualizado exitosamente."
                })
            }else{
                return res
                .status(404)
                .send({
                    message: `No se pudo actualizar el producto con id=${id}. Tal vez no se encontró o la solicitud está vacía.`
                })
            }
        }catch(err){
            return res
            .status(500)
            .send({
                message: `Error al actualizar el producto con id=${id}. ${err.message}`
            })
        }
    }
    async delete(req,res){
        const id=req.params.id;
        if(!id){
            return res
            .status(400)
            .send({
                message: "El ID del producto es requerido para eliminar."
            })
        }
        try{
            const deleted= await Producto.destroy({ where: {id_producto: id}})
            if(deleted===1){
                return res
                .status(200)
                .send({
                    message: "Producto eliminado exitosamente."
                })
            }
        }catch(err){
            return res
            .status(500)
            .send({
                message: `Error al eliminar el producto con id=${id}. ${err.message}`
            })
        }
    }
}
module.exports= ProductoController;