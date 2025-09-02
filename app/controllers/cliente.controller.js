const db = require("../models");
const Cliente = db.getModel("Cliente"); 

class ClienteController {
  async create(req, res) {
    if (!req.body.nombre) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const cliente = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      direccion: req.body.direccion,
      correo: req.body.correo,
      telefono: req.body.telefono,
      ingreso: req.body.ingreso || new Date(),
      status: req.body.status ?? false,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: req.body.updatedAt || new Date()
    };

    try {
      const data = await Cliente.create(cliente);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Client."
      });
    }
  }

  async findAll(req, res) {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    try {
      const data = await Cliente.findAll({ where: condition });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients."
      });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const data = await Cliente.findByPk(id);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: "Error retrieving Cliente with id=" + id
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;

    try {
      const [updated] = await Cliente.update(req.body, { where: { id } });

      if (updated === 1) {
        res.send({ message: "Cliente was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe not found or request is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const deleted = await Cliente.destroy({ where: { id } });

      if (deleted === 1) {
        res.send({ message: "Client was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
      });
    }
  }

  async deleteAll(req, res) {
    try {
      const count = await Cliente.destroy({ where: {}, truncate: false });
      res.send({ message: `${count} Clients were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all clients."
      });
    }
  }

  async findAllStatus(req, res) {
    try {
      const data = await Cliente.findAll({ where: { status: true } });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients."
      });
    }
  }
}

module.exports = ClienteController;
