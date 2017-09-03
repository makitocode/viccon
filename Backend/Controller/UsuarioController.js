//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Usuario = require('../Model/Usuario')



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
        objresponse.status(200).send({usuario: _usuario})
    })
}
/*************************************** POST ******************************/
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
    ActualizarUsuario,
    EliminarUsuario
}



























