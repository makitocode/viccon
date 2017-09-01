'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const VideoSchema = Schema({
    nombres: String,
    apellidos: String,
    email: {type: String, lowercase: true},
    fechaCarga: {type: Date, default: Date.now()},
    estado: {type: String, enum: ['Procesado', 'En espera'], default: 'En espera'},
    rutaVideoOriginal: String,
    rutaVideoConvertido: String,
    mensaje: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Video', VideoSchema)