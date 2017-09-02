'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const VideoSchema = Schema({
    nombreAutor: String,
    apellidosAutor: String,
    email: {type: String, lowercase: true},
    fechaCarga: {type: Date, default: Date.now()},
    estado: {type: String, enum: ['Procesado', 'En espera'], default: 'En espera'},
    nombreVideo: String,
    rutaImagenVideo: String,
    rutaVideoOriginal: String,
    rutaVideoConvertido: String,
    mensaje: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Video', VideoSchema)