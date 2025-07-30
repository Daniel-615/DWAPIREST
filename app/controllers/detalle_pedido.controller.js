const db = require("../models");
const DetallePedido = db.getModel("DetallePedido");
const Pedido = db.getModel("Pedido");
const Producto = db.getModel("Producto");

class DetallePedidoController {
  async create(req, res) {
    const { id_pedido, producto, cantidad } = req.body;

    if (!id_pedido || !producto || !cantidad) {
      return res.status(400).send({
        message: "Se requiere id_pedido, producto y cantidad."
      });
    }

    const detallePedido = {
      id_pedido,
      id_producto: producto,
      cantidad
    };

    try {
      const data = await DetallePedido.create(detallePedido);
      return res.status(201).send({
        message: "Detalle de pedido creado exitosamente.",
        data
      });
    } catch (err) {
      return res.status(500).send({
        message: "Error al crear el pedido {err}"
      });
    }
  }

  async findAll(req, res) {
    try {
      const data = await DetallePedido.findAll({
        include: [
          { model: Pedido, as: "pedido" },
          { model: Producto, as: "producto" }
        ]
      });

      return res.status(200).send({
        message: "Detalles de pedidos encontrados.",
        data
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al recuperar los detalles de pedidos."
      });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const data = await DetallePedido.findByPk(id, {
        include: [
          { model: Pedido, as: "pedido" },
          { model: Producto, as: "producto" }
        ]
      });

      if (!data) {
        return res.status(404).send({
          message: `Detalle de pedido con id ${id} no encontrado.`
        });
      }

      return res.status(200).send({
        message: "Detalle de pedido encontrado.",
        data
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al recuperar el detalle de pedido."
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        message: "El id del detalle de pedido es requerido."
      });
    }

    try {
      const detallePedido = await DetallePedido.findByPk(id);

      if (!detallePedido) {
        return res.status(404).send({
          message: `Detalle de pedido con id ${id} no encontrado.`
        });
      }

      const updatedData = {
        id_producto: req.body.producto ?? detallePedido.id_producto,
        cantidad: req.body.cantidad ?? detallePedido.cantidad
      };

      await detallePedido.update(updatedData);

      return res.status(200).send({
        message: "Detalle de pedido actualizado exitosamente.",
        data: detallePedido
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al actualizar el detalle de pedido."
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        message: "El id del detalle de pedido es requerido para eliminar."
      });
    }

    try {
      const deleted = await DetallePedido.destroy({
        where: { id_detalle: id }
      });

      if (deleted === 1) {
        return res.status(200).send({
          message: "Detalle de pedido eliminado exitosamente."
        });
      } else {
        return res.status(404).send({
          message: `Detalle de pedido con id ${id} no encontrado.`
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al eliminar el detalle de pedido."
      });
    }
  }
}

module.exports = DetallePedidoController;
