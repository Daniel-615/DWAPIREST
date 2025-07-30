const { Model, DataTypes } = require('sequelize');

class Producto extends Model {}

module.exports = (sequelize) => {
  Producto.init(
    {
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'producto',
      timestamps: true
    }
  );

  //Asociación
  Producto.associate = (models) => {
    Producto.hasMany(models.DetallePedido, {
      foreignKey: 'id_producto',
      as: 'detalles'
    });
  };

  return Producto;
};
