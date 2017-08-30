'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const ConcursoSchema = Schema({
    nombre: String,
    imagen: String,
    url: String,
    fechaInicio: String, /// formato fecha??
    fechaFin: {type: String, enum: ['Procesado', 'En espera']},
    premio: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Concurso', ConcursoSchema)