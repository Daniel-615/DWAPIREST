const { Model, DataTypes } = require('sequelize');

class DetallePedido extends Model {}

module.exports = (sequelize) => {
  DetallePedido.init(
    {
      id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.Pedido, 
          key: 'id_pedido'
        }
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.Producto, 
          key: 'id_producto'
        }
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      }
    },
    {
      sequelize,
      modelName: 'DetallePedido',
      tableName: 'detalle_pedido', 
      timestamps: true
    }
  );

  // Relaciones
  DetallePedido.associate = (models) => {
    DetallePedido.belongsTo(models.Pedido, {
      foreignKey: 'id_pedido',
      as: 'pedido'
    });

    DetallePedido.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto'
    });
  };

  return DetallePedido;
};
