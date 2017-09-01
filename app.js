//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Permite el tratamiento de respuesta y mapeo de los body en las peticiones HTTP
const express = require('express')
const bodyParser = require('body-parser')
//Se instancia el servicio
const app = express()
//Instancia el archivo de rutas
const api = require('./Backend/routes')

//Configuraciones del bodyparser - Parsear objetos del body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //Para adminitr peticiones con json (body)
//Para usar el modulo api
app.use('/api', api)

//Se indica al servidor express que la ruta de los archivos
//html, css y js está en la ruta indicada
app.use(express.static(__dirname + '/public')) 

//Exportar Modulos
module.exports = app