const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {}

module.exports = (sequelize) => {
  Pedido.init(
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pedido_numero:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true,
          len: [1, 20] // Longitud máxima de 20 caracteres
        }
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes', 
          key: 'id'
        }
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'pedidos',
      timestamps: true
    }
  );

  // Relaciones
  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, {
      foreignKey: 'id_cliente',
      as: 'cliente'
    });

    Pedido.hasMany(models.DetallePedido, {
      foreignKey: 'id_pedido',
      as: 'detalles'
    });
  };
  return Pedido;
};