'user strict'

// const mongoose  = require('mongoose')
// const Schema = mongoose.Schema
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('../config')

//db
const mysql = require('mysql2')
const Sequelize = require('sequelize')
const connection = new Sequelize(config.MySql_db, config.MySql_user, config.Mysql_pass, 
                  {
                    host: config.MySql_host,
                    dialect: 'mysql',
                    port: config.MySql_port
                  });

const DeploySchema = connection.define('Deploy', {
    nombre: {type: Sequelize.STRING, allowNull: false},
    tipo: {type: Sequelize.STRING, enum: ['bd', 'aws'], require: true},
    url: {type: Sequelize.STRING, unique: true, allowNull: false},
    key: {type: Sequelize.STRING, allowNull: false /*select:false*/}, //para que los get no retornen el password
    despliegue: {type: Sequelize.STRING, enum: ['a', 'b']},
    fechaRegistro: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    
  }, {
      timestamps: false,
      freezeTableName: true //Evita que mysql pluralice el nombre de la BD
  });

  DeploySchema.sync({logging: console.log}).then(function(){ }).catch((err)=>{
    console.log(`Error sincronizando el modelo Deploy ${err}`)
})

//Para exportar el modelo creado de mysql
module.exports = DeploySchema 