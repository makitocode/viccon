//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Deploy = require('../Model/Deploy_mongodb')
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')

/*************************************** GET ******************************/
//Obtener toda la información de las rutas y claves de los despliegues
function ConsultarConfiguraciones(objrequest, objresponse){
    Deploy.find({}, (err, _deploy) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_deploy){
            objresponse.status(404).send({mensaje: 'No existen configuraciones'})
        }
        // for (let value of _deploy) {
        //     value.clave = '';
        // }
        objresponse.status(200).send({configuracion: _deploy})
    })
}
//Obtener información de la Configuración por Id
function ConsultarConfiguracionPorId(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    Deploy.findById(_idConfiguracion, (err, _configuracion) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_configuracion){
            objresponse.status(404).send({mensaje: 'La configuración no existe'})
        }
        //_usuario.clave = ''
        objresponse.status(200).send({configuracion: _configuracion})
    })
}

/*************************************** POST ******************************/
//Obtener Usuario por correo
//pendiente enviar clave encriptada para validar
// function IniciarSesion(objrequest, objresponse){
//     var _email = objrequest.params.email
//     var _pass = objrequest.body.clave
//     //Busca usuario por mail
//     Usuario.find({email: _email}, (err, _usuario) => {
//         if(err){
//             console.log(`Error consultando usuario por mail: ${err}`)
//             objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
//         }
//         console.log(_usuario.length)
//         if(_usuario.length > 0){
//             var claveObtenida = _usuario[0].clave
//             console.log(`clave: ${claveObtenida}`)
//             bcrypt.compare(_pass, claveObtenida, function(err, res) {
//                 if(err){
//                     console.log(`Error consultando usuario por mail: ${err}`)
//                     objresponse.status(500).send({mensaje: `Error iniciando sesion`})
//                 }
//                 if(res == true){
//                     _usuario[0].clave = ''
//                     objresponse.status(200).send({usuario: _usuario})
//                 }
//                 else
//                     objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
//             })
//         }
//         else
//         {
//             objresponse.status(404).send({mensaje: `Usuario o contraseña incorrecto`})
//         }
//     })
// }

//Crear Configuración
function CrearConfiguracion(objrequest, objresponse){
    var _configuracion = new Deploy()
    _configuracion.nombre = objrequest.body.nombres
    _configuracion.tipo = objrequest.body.apellidos
    _configuracion.url = objrequest.body.email,
    _configuracion.key = objrequest.body.clave
    _configuracion.despliegue = objrequest.body.perfil

    //Se almacena la configuración
    _configuracion.save((err, _ConfiguracionGuardada) => {
        if(err){
            objresponse.status(400).send(`Error al guardar en la base de datos: ${err}`)
        }
        else{
            var configuracionGuardada = new Deploy()
            configuracionGuardada.nombre = _UsuarioGuardado.nombre
            configuracionGuardada.tipo = _UsuarioGuardado.tipo
            configuracionGuardada.url = _UsuarioGuardado.url,
            configuracionGuardada.key = _UsuarioGuardado.key,
            configuracionGuardada.despliegue = _UsuarioGuardado.despliegue
            objresponse.status(200).send({configuracion: configuracionGuardada})
        }
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Configuración
function ActualizarConfiguracion(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    var configuracionFromBody = objrequest.body
    Usuario.findByIdAndUpdate(_idConfiguracion, configuracionFromBody, (err, usuarioActualizado) => {
        if(err){
            objresponse.status(400).send(`Error al actualizar la configuración : ${err}`)
        }
        objresponse.status(200).send({mensaje: "Usuario actualizado correctamente"})
    })
}
/*************************************** DELETE ******************************/
//Eliminar configuracion
function EliminarConfiguracion(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    Deploy.findById(_idConfiguracion, (err, _configuracion) => {
        if(err){
            objresponse.status(500).send(`Error al eliminar la configuración : ${err}`)
        }
        _configuracion.remove(err => {
            if(err){
                objresponse.status(400).send(`Error al eliminar la configuración : ${err}`)
            }   
            objresponse.status(200).send({mensaje: "Configuración eliminada correctamente"})
        })
    })
}

//Se exporta el controlador
module.exports ={
    ConsultarConfiguraciones,
    ConsultarConfiguracionPorId,
    CrearConfiguracion,
    ActualizarConfiguracion,
    EliminarConfiguracion
}