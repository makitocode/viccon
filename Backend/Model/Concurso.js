'user strict'

var config = require('../config')
const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const ConcursoSchema = Schema({
    userId: {type: String, required:true},
    rutaMultimedia: {type:String, default: config.rutaMultimedia},
    nombreCarpetaOriginal: {type:String, default: config.nombreCarpetaOriginal},
    nombreCarpetaConvertida: {type:String, default: config.nombreCarpetaConvertida},
    nombreCarpetaThumb: {type:String, default: config.nombreCarpetaThumb},
    nombre: String,
    imagen: String,
    url: String,
    fechaInicio: {type: Date, default: Date.now()},
    fechaFin: Date, 
    premio: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Concurso', ConcursoSchema)