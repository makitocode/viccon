//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Deploy = require('../Model/Config_mongodb')
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
        if(!_deploy || _deploy.length <= 0){
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
//Obtener toda la información de la configuración por despliegue
function ConsultarConfiguracionesPorDespliegue(objrequest, objresponse){
    var _despliegueConfiguracion = objrequest.params.despliegue
    Deploy.find({ despliegue: _despliegueConfiguracion}, (err, _deploy) => {
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

//Obtener toda la información de las configuraciones por despliegue y tipo
function ConsultarConfiguracionesPorDespliegueyTipo(objrequest, objresponse){
    var _despliegueConfiguracion = objrequest.params.despliegue
    var _tipoConfiguracion = objrequest.params.tipo
    Deploy.find({ despliegue: _despliegueConfiguracion, tipo: _tipoConfiguracion}, (err, _deploy) => {
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

//Crear Configuración
function CrearConfiguracion(objrequest, objresponse){
    var _configuracion = new Deploy()
    _configuracion.nombre = objrequest.body.nombre
    _configuracion.tipo = objrequest.body.tipo
    _configuracion.url = objrequest.body.url,
    _configuracion.key = objrequest.body.key
    _configuracion.despliegue = objrequest.body.despliegue
    _configuracion.usuario = objrequest.body.usuario
    _configuracion.clave = objrequest.body.clave

    //Se almacena la configuración
    _configuracion.save((err, _ConfiguracionGuardada) => {
        if(err){
            objresponse.status(400).send(`Error al guardar en la base de datos: ${err}`)
        }
        else{
            var configuracionGuardada = new Deploy()
            configuracionGuardada._id = _ConfiguracionGuardada._id
            configuracionGuardada.nombre = _ConfiguracionGuardada.nombre
            configuracionGuardada.tipo = _ConfiguracionGuardada.tipo
            configuracionGuardada.url = _ConfiguracionGuardada.url,
            configuracionGuardada.key = _ConfiguracionGuardada.key,
            configuracionGuardada.despliegue = _ConfiguracionGuardada.despliegue,
            configuracionGuardada.usuario = _ConfiguracionGuardada.usuario,
            configuracionGuardada.clave = _ConfiguracionGuardada.clave
            objresponse.status(200).send({configuracion: configuracionGuardada})
        }
    })
}


/*************************************** UPDATE ******************************/
//Actualizar Configuración
function ActualizarConfiguracion(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    var configuracionFromBody = objrequest.body
    Deploy.findByIdAndUpdate(_idConfiguracion, configuracionFromBody, (err, configActualiado) => {
        if(err){
            objresponse.status(400).send(`Error al actualizar la configuración : ${err}`)
        }
        objresponse.status(200).send({mensaje: "Configuración actualizada correctamente"})
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
    ConsultarConfiguracionesPorDespliegue,
    ConsultarConfiguracionesPorDespliegueyTipo,
    CrearConfiguracion,
    ActualizarConfiguracion,
    EliminarConfiguracion
}