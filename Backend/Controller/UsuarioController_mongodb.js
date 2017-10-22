//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Usuario = require('../Model/Usuario_mongodb')
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')



/*************************************** GET ******************************/
//Obtener Usuarios
function ObtenerUsuarios(objrequest, objresponse){
    Usuario.find({}, (err, _usuario) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_usuario){
            objresponse.status(404).send({mensaje: 'El usuario no existe'})
        }
        for (let value of _usuario) {
            value.clave = '';
        }
        // for (let i in iterable) {
        //     console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
        // }
        objresponse.status(200).send({usuario: _usuario})
    })
}
//Obtener Usuario por Id
function ObtenerUsuarioPorId(objrequest, objresponse){
    var _idUsuario = objrequest.params.id
    Usuario.findById(_idUsuario, (err, _usuario) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_usuario){
            objresponse.status(404).send({mensaje: 'El usuario no existe'})
        }
        _usuario.clave = ''
        objresponse.status(200).send({usuario: _usuario})
    })
}

/*************************************** POST ******************************/
//Obtener Usuario por correo
//pendiente enviar clave encriptada para validar
function IniciarSesion(objrequest, objresponse){
    var _email = objrequest.params.email
    var _pass = objrequest.body.clave
    //Busca usuario por mail
    Usuario.find({email: _email}, (err, _usuario) => {
        if(err){
            console.log(`Error consultando usuario por mail: ${err}`)
            objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
        }
        console.log(_usuario.length)
        if(_usuario.length > 0){
            var claveObtenida = _usuario[0].clave
            console.log(`clave: ${claveObtenida}`)
            bcrypt.compare(_pass, claveObtenida, function(err, res) {
                if(err){
                    console.log(`Error consultando usuario por mail: ${err}`)
                    objresponse.status(500).send({mensaje: `Error iniciando sesion`})
                }
                if(res == true){
                    _usuario[0].clave = ''
                    objresponse.status(200).send({usuario: _usuario})
                }
                else
                    objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
            })
        }
        else
        {
            objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
        }
    })
}

//Crear usuario
function CrearUsuario(objrequest, objresponse){
    var _usuario = new Usuario()
    _usuario.nombres = objrequest.body.nombres
    _usuario.apellidos = objrequest.body.apellidos
    _usuario.email = objrequest.body.email,
    _usuario.clave = objrequest.body.clave
    _usuario.perfil = objrequest.body.perfil

    //Se almacena el usuario
    _usuario.save((err, _UsuarioGuardado) => {
        if(err){
            objresponse.status(400).send(`Error al guardar en la base de datos: ${err}`)
        }
        else{
            var usuarioGuardado = new Usuario()
            usuarioGuardado.nombres = _UsuarioGuardado.nombres
            usuarioGuardado.apellidos = _UsuarioGuardado.apellidos
            usuarioGuardado.email = _UsuarioGuardado.email,
            usuarioGuardado._id = _UsuarioGuardado._id,
            usuarioGuardado.perfil = _UsuarioGuardado.perfil
            objresponse.status(200).send({usuario: usuarioGuardado})
        }
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Usuario
function ActualizarUsuario(objrequest, objresponse){
    var idUsuario = objrequest.params.id
    var userFromBody = objrequest.body
    Usuario.findByIdAndUpdate(idUsuario, userFromBody, (err, usuarioActualizado) => {
        if(err){
            objresponse.status(400).send(`Error al actualizar el usuario : ${err}`)
        }
        objresponse.status(200).send({mensaje: "Usuario actualizado correctamente"})
    })
}
/*************************************** DELETE ******************************/
//Eliminar usuario
function EliminarUsuario(objrequest, objresponse){
    var idUsuario = objrequest.params.id
    Usuario.findById(idUsuario, (err, usuario) => {
        if(err){
            objresponse.status(400).send(`Error al eliminar el usuario : ${err}`)
        }
        usuario.remove(err => {
            if(err){
                objresponse.status(500).send(`Error al eliminar el usuario : ${err}`)
            }   
            objresponse.status(200).send({mensaje: "Usuario eliminado correctamente"})
        })
    })
}


//Se exporta el controlador
module.exports ={
    ObtenerUsuarios,
    ObtenerUsuarioPorId,
    CrearUsuario,
    //ActualizarUsuario,
    //EliminarUsuario,
    IniciarSesion
}