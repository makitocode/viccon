//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Usuario = require('../Model/Usuario')
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')



/*************************************** GET ******************************/
//Obtener Usuarios
function ObtenerUsuarios(objrequest, objresponse){
    Usuario.findAll().then((_usuarios) => {
        if(!_usuarios){
            objresponse.status(404).send({mensaje: 'No existen usuarios registrados'})
        }
        if(_usuarios.length <= 0)
            objresponse.status(404).send({mensaje: 'No existen usuarios registrados.'})
        else
        {
            for (let value of _usuarios) {
                value.clave = '';
            }
            objresponse.status(200).send({usuario: _usuarios})
        }
      }).catch((err) => {
          console.log(`Error generado al consultar usuarios: ${err}`)
          objresponse.status(500).send({mensaje: 'Error interno del servicio'})
      })
}
//Obtener Usuario por id
function ObtenerUsuarioPorId(objrequest, objresponse){
    var _idUsuario = objrequest.params.id
    Usuario.findOne({ where: {id: _idUsuario} }).then((_usuario)=>{
        if(!_usuario){
            objresponse.status(404).send({mensaje: 'El usuario no existe'})
        }
        else{
            _usuario.clave = ''
            objresponse.status(200).send({usuario: _usuario})
        }
    }).catch((err) => {
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

/*************************************** POST ******************************/
//Obtener Usuario por correo
//pendiente enviar clave encriptada para validar
//Obtener Usuario por id
function IniciarSesion(objrequest, objresponse){
    var _email = objrequest.params.email
    var _pass = objrequest.body.clave
    Usuario.findOne({ where: {email: _email, clave: _pass}}).then((_usuario)=>{
        if(!_usuario){
            console.log(`Usuario o contraseña inconrrecta`)
            objresponse.status(404).send({mensaje: 'Usuario o contraseña inconrrecta'})
        }
        else{
            _usuario.clave = ''
            objresponse.status(200).send({usuario: _usuario})
        }
    }).catch((err) => {
        console.log(`Error iniciando sesión: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}
// function IniciarSesion(objrequest, objresponse){
//     var _email = objrequest.params.email
//     var _pass = objrequest.body.clave
//     //Busca usuario por mail
//     Usuario.find({email: _email}, (err, _usuario) => {
//         if(err){
//             console.log('Error consultando usuario por mail: ${err}')
//             objresponse.status(404).send({mensaje: 'Usuario o contraseña incorrecto'})
//         }
//         console.log(_usuario.length)
//         if(_usuario.length > 0){
//             var claveObtenida = _usuario[0].clave
//             console.log('clave: ${claveObtenida}')
//             bcrypt.compare(_pass, claveObtenida, function(err, res) {
//                 if(err){
//                     console.log('Error consultando usuario por mail: ${err}')
//                     objresponse.status(500).send({mensaje: 'Error iniciando sesion'})
//                 }
//                 if(res == true){
//                     _usuario[0].clave = ''
//                     objresponse.status(200).send({usuario: _usuario})
//                 }
//                 else
//                     objresponse.status(404).send({mensaje: 'Usuario o contraseña incorrecto'})
//             })
//         }
//         else
//         {
//             objresponse.status(404).send({mensaje: 'Usuario o contraseña incorrecto'})
//         }
        
//     })
// }
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
    _usuario.save(_usuario).then((_UsuarioGuardado)=>{
        if(!_UsuarioGuardado)
            objresponse.status(400).send({mensaje: "Error al crear el usuario"})
        else
        {
            objresponse.status(200).send({usuario: _UsuarioGuardado})
        }
    }).catch((err)=>{
        console.log(`Error creando usuario: ${err}`)
        objresponse.status(500).send({mensaje: "Error al crear el usuario"})
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Usuario
// function ActualizarUsuario(objrequest, objresponse){
//     var idUsuario = objrequest.params.id
//     var userFromBody = objrequest.body
//     Usuario.findByIdAndUpdate(idUsuario, userFromBody, (err, usuarioActualizado) => {
//         if(err){
//             objresponse.status(400).send({mensaje: "Error al actualizar el usuario"})
//         }
//         objresponse.status(200).send({mensaje: "Usuario actualizado correctamente"})
//     })
// }
/*************************************** DELETE ******************************/
//Eliminar usuario
// function EliminarUsuario(objrequest, objresponse){
//     var idUsuario = objrequest.params.id
//     Usuario.findById(idUsuario, (err, usuario) => {
//         if(err){
//             objresponse.status(400).send({mensaje: "Error al eliminar el usuario"})
//         }
//         usuario.remove(err => {
//             if(err){
//                 objresponse.status(500).send({mensaje: "Error al eliminar el usuario "})
//             }   
//             objresponse.status(200).send({mensaje: "Usuario eliminado correctamente"})
//         })
//     })
// }


//Se exporta el controlador
module.exports ={
    ObtenerUsuarios,
    ObtenerUsuarioPorId,
    CrearUsuario,
    //ActualizarUsuario,
    //EliminarUsuario,
    IniciarSesion
}



























