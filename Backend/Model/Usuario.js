'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const UsuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    email: String,
    clave: String,
    perfil: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Usuario', UsuarioSchema)