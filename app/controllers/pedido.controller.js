const db = require("../models");
const Pedido = db.getModel("Pedido");
const Cliente = db.getModel("Cliente");
const { Op } = require("sequelize"); // Importar operador

class PedidoController {
  async create(req, res) {
    const { id_cliente, pedido_numero, total } = req.body;

    if (!id_cliente || !pedido_numero || !total) {
      return res.status(400).send({
        message: "Se requiere id_cliente, pedido_numero y total.",
      });
    }

    try {
      // Verificar que el cliente exista
      const cliente = await Cliente.findByPk(id_cliente);
      if (!cliente) {
        return res.status(404).send({
          message: `No se encontró el cliente con id ${id_cliente}.`,
        });
      }

      // Verificar que no se repita el número de pedido
      const exist = await Pedido.findOne({ where: { pedido_numero } });
      if (exist) {
        return res.status(400).send({
          message: `El pedido con número ${pedido_numero} ya existe.`,
        });
      }

      const pedido = { id_cliente, pedido_numero, total };
      const data = await Pedido.create(pedido);

      return res.status(201).send({
        message: "Pedido creado exitosamente.",
        data: data,
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al crear el pedido.",
      });
    }
  }

  async findAll(req, res) {
    const pedido_numero = req.query.pedido_numero;
    const condition = pedido_numero
      ? { pedido_numero: { [Op.iLike]: `%${pedido_numero}%` } }
      : null;

    try {
      const data = await Pedido.findAll({
        where: condition,
        include: [
          {
            model: Cliente,
            as: "cliente",
          },
        ],
      });

      return res.status(200).send({
        message: "Pedidos encontrados.",
        data: data,
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al recuperar los pedidos.",
      });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: "El id del pedido es requerido.",
      });
    }

    try {
      const data = await Pedido.findByPk(id, {
        include: [
          {
            model: Cliente,
            as: "cliente",
          },
        ],
      });

      if (!data) {
        return res.status(404).send({
          message: `Pedido con id ${id} no encontrado.`,
        });
      }

      return res.status(200).send({
        message: "Pedido encontrado.",
        data: data,
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Error al recuperar el pedido.",
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: "El ID del pedido es requerido para actualizar.",
      });
    }

    try {
      const [updated] = await Pedido.update(req.body, {
        where: { id_pedido: id },
      });

      if (updated === 1) {
        return res.status(200).send({
          message: "Pedido actualizado exitosamente.",
        });
      } else {
        return res.status(404).send({
          message: `Pedido con id=${id} no encontrado o no actualizado.`,
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: `Error al actualizar el pedido con id=${id}. ${err.message}`,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: "El ID del pedido es requerido para eliminar.",
      });
    }

    try {
      const deleted = await Pedido.destroy({ where: { id_pedido: id } });
      if (deleted === 1) {
        return res.status(200).send({
          message: "Pedido eliminado exitosamente.",
        });
      } else {
        return res.status(404).send({
          message: `No se encontró el pedido con id=${id}.`,
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: `Error al eliminar el pedido con id=${id}. ${err.message}`,
      });
    }
  }
}

module.exports = PedidoController;
