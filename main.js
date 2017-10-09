//usar los nuevos tipos de variables y características de EMC6
'use strict'
//Referencia a mongoose
const mongoose = require('mongoose')
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('./Backend/config')
//Referencia al app
var app = require('./app')

//****MONGOdb****
mongoose.connect(config.db, (err, res)=>{
    if(err) {
        console.log(`Error al conectar a la base de datos: ${err}`)
    }
    else
        console.log('Conexión a Mongodb establecida...')

    app.listen(config.port, () => {
        console.log(`Api rest corriendo correctamente con Nodejs en el puerto ${config.port}`)
    })
})


