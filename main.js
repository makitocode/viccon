//usar los nuevos tipos de variables y características de EMC6
'use strict'
//Referencia a mongoose
const mongoose = require('mongoose')
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('./Backend/config')
//Referencia al app
var app = require('./app')
//db
const Sequelize = require('sequelize');
const sequelize = new Sequelize('LocalTest', 'root', 'root', 
                  {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: '8889'
                  });


//Habilita el escucha por el puerto seleccionado

//****Mysql****
sequelize.authenticate().then(() => {
        console.log('Connection with mysql has been established successfully...   :) ');
        app.listen(config.port, () => {
        console.log(`Api rest corriendo correctamente con mysql en el puerto ${config.port}`)
        })
}).catch(err => {
    console.log(`Error al conectar a la base de datos: ${err}`)
});

//****MONGOdb****
// mongoose.connect(config.db, (err, res)=>{
//     if(err) {
//         console.log(`Error al conectar a la base de datos: ${err}`)
//     }
//     else
//         console.log('Conexión a Mongodb establecida...')

//     app.listen(config.port, () => {
//         console.log(`Api rest corriendo correctamente con Nodejs en el puerto ${config.port}`)
//     })
// })


