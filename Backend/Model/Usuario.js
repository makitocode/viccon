'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')

//Modelo 
const UsuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    email: {type: String, unique: true, lowercase: true},
    clave: {type: String, select:false}, //para que los get no retornen el password
    fechaRegistro: {type: Date, default: Date.now()},
    fechaUltimoIngreso: Date,
    perfil: String
})

//Funciòn que se ejecuta antes de que el 
//modelo se almacena en la base de datos
//y permite encriptar la contraseña.
UsuarioSchema.pre('save'/*antes de guardar*/, function(next){
    let user = this
    //si el usuario no ha modificado su contraseña que continúe
    if(!user.isModified('clave')) 
        return next()
    bcrypt.genSalt(10, (err, salt) => {
        if(err)
            return next(err)
        bcrypt.hash(user.clave, salt, null, (err, hash) => {
            if(err)
                return next(err)
            user.clave = hash
            next()
        })
    })

})

//Función para asignar un avatar a través del mail
//Hace uso de usa librería crypto para 
// UsuarioSchema.methods.gravatar = function(){
//     if(!this.email)
//         return `https://gravatar.com/avatar/?s=200&d=retro`
//     //Crear hash en md5 para buscar el avatar del usuario
//     //md5 es lo que usa gravatar en la url de un avatar
//     const md5 = crypto.createHash('md5').update(this.email).digest('hex')
//     return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
// }

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Usuario', UsuarioSchema)