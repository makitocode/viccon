'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const VideoSchema = Schema({
    // rutaConcurso: String,
    nombreAutor: String,
    idConcurso: {type:String, required:true},
    apellidosAutor: String,
    email: {type: String, lowercase: true},
    fechaCarga: {type: Date, default: Date.now()},
    estado: {type: String, enum: ['Procesado', 'SinProcesar'], default: 'SinProcesar'},
    nombreVideo: String,
    rutaImagenVideo: {type:String, default: ''},
    nombreExtensionVideoOriginal: String,
    nombreVideoConvertido: {type:String, default: ''}, //solo nombre sin extensión
    mensaje: String,
    porqueLeGusta: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Video', VideoSchema)