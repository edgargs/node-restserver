const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');

const Usuario = db.define('Usuario', {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROLE'
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    // Other model options go here
    tableName: 'usuario'
  });


module.exports = Usuario