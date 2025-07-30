const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`; 
    }
    static async findActivos() {
        return this.findAll({ where: { status: true } }); 
        
    }
}

module.exports = (sequelize) => {
  Cliente.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING
      },
      direccion: {
        type: DataTypes.STRING
      },
      correo: {
        type: DataTypes.STRING
      },
      telefono: {
        type: DataTypes.STRING
      },
      ingreso: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'cliente',
      tableName: 'clientes', 
      timestamps: true      
    }
  );

  return Cliente;
};
