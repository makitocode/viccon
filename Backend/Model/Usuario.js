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

const UsuarioSchema = connection.define('Usuario', {
    nombres: {type: Sequelize.STRING, allowNull: false},
    apellidos: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, unique: true, lowercase: true, allowNull: false},
    clave: {type: Sequelize.STRING, allowNull: false /*select:false*/}, //para que los get no retornen el password
    fechaRegistro: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    fechaUltimoIngreso: {type: Sequelize.DATE},
    perfil: {type: Sequelize.STRING, enum: ['Admin', 'Concursante'], defaultValue: 'Admin'}
  }, {
      timestamps: false,
      freezeTableName: true, //Evita que mysql pluralice el nombre de la BD
      hooks: {
          beforeCreate: (user)=>{
            bcrypt.genSalt(10, (err, salt) => {
                        if(err)
                            throw new Error(err)
                        bcrypt.hash(user.clave, salt, null, (err, hash) => {
                            if(err)
                                throw new Error(err)
                            else{
                                user.clave = hash  
                            }
                        })
                    })
          }
      }
  });

UsuarioSchema.sync({logging: console.log}).then(function(){
    console.log(`Modelo Usuario Actualizado`)
}).catch((err)=>{
    console.log(`Error sincronizando el modelo Usuario ${err}`)
})


//Funciòn que se ejecuta antes de que el 
//modelo se almacena en la base de datos
//y permite encriptar la contraseña.
// UsuarioSchema.beforeCreate((user, next) => {
//     //si el usuario no ha modificado su contraseña que continúe
//     bcrypt.genSalt(10, (err, salt) => {
//         if(err)
//             return next(err)
//         bcrypt.hash(user.clave, salt, null, (err, hash) => {
//             if(err)
//                 return next(err)
//             user.clave = hash
            
//         })
//     })
//   });

//Para exportar el modelo creado de mysql
module.exports = UsuarioSchema 
