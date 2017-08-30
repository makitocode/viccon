'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const VideoSchema = Schema({
    nombres: String,
    apellidos: String,
    email: String,
    fechaCarga: String, /// formato fecha??
    estado: {type: String, enum: ['Procesado', 'En espera']},
    rutaVideoOriginal: String,
    rutaVideoConvertido: String,
    mensaje: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Video', VideoSchema)