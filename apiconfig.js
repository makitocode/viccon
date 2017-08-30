//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Permite el tratamiento de respuesta y mapeo de los body en las peticiones HTTP
var express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

//Se instancia el servicio
var app = express()
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var port = process.env.port || 2017

//Se indica al servidor express que la ruta de los archivos
//html, css y js está en la ruta indicada
app.use(express.static(__dirname + '/public')) 

//Habilita el escucha por el puerto seleccionado
app.listen(port, () => {
    console.log(`Api rest corriendo correctamente con Nodejs en el puerto ${port}`)
})