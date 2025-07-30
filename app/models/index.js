const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

class Database {
  constructor() {
    this._sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false
      }
    );

    this.Sequelize = Sequelize;
    this.models = {};

    this._loadModels();
    this._applyAssociations();
  }

  _loadModels() {
    const sequelize = this._sequelize;

    this.models.Cliente = require('./cliente.models.js')(sequelize, Sequelize.DataTypes);
    this.models.Producto = require('./producto.models.js')(sequelize, Sequelize.DataTypes);
    this.models.Pedido = require('./pedido.models.js')(sequelize, Sequelize.DataTypes);
    this.models.DetallePedido = require('./detalle_pedido.models.js')(sequelize, Sequelize.DataTypes);

    // Agrega más modelos si necesitas
  }

  _applyAssociations() {
    const models = this.models;

    Object.values(models).forEach((model) => {
      if (typeof model.associate === 'function') {
        model.associate(models);
      }
    });
  }

  get sequelize() {
    return this._sequelize;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = new Database();
