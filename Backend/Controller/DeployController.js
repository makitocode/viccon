//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Deploy = require('../Model/Deploy')

/*************************************** GET ******************************/
//Obtener toda la información de las rutas y claves de los despliegues
function ConsultarConfiguraciones(objrequest, objresponse){
    Deploy.findAll().then((_deploy) => {
        if(!_deploy || _deploy.length <= 0){
            objresponse.status(404).send({mensaje: 'No existen usuarios registrados'})
        }
        else
        {
            objresponse.status(200).send({configuracion: _deploy})
        }
      }).catch((err) => {
          console.log(`Error generado al consultar configuración: ${err}`)
          objresponse.status(500).send({mensaje: 'Error interno del servicio'})
      })
}

//Obtener información de la Configuración por Id
function ConsultarConfiguracionPorId(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    Deploy.findOne({ where: {id: _idConfiguracion} }).then((_configuracion)=>{
        if(!_configuracion){
            objresponse.status(404).send({mensaje: 'La configuración no existe'})
        }
        else{
            _usuario.clave = ''
            objresponse.status(200).send({configuracion: _configuracion})
        }
    }).catch((err) => {
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

/*************************************** POST ******************************/
//Obtener toda la información de la configuración por despliegue
function ConsultarConfiguracionesPorDespliegue(objrequest, objresponse){
    var _despliegueConfiguracion = objrequest.params.despliegue
    Deploy.findAll({ where: {despliegue: _despliegueConfiguracion} }).then((_deploy)=>{
        if(!_deploy){
            objresponse.status(404).send({mensaje: 'No existen configuraciones'})
        }
        else{
            objresponse.status(200).send({configuracion: _deploy})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar configuraciones por despliegue: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Obtener toda la información de las configuraciones por despliegue y tipo
function ConsultarConfiguracionesPorDespliegueyTipo(objrequest, objresponse){
    var _despliegueConfiguracion = objrequest.params.despliegue
    var _tipoConfiguracion = objrequest.params.estado
    Deploy.findAll({where: {despliegue:_despliegueConfiguracion, tipo: _tipoConfiguracion}}).then((_deploy)=>{
        if(!_deploy){
            objresponse.status(404).send({mensaje: 'No existen videos'})
        }
        else{
                objresponse.status(200).send({configuracion: _deploy})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar configuración por despliegue y tipo: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
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

    _configuracion.save(_configuracion).then((_ConfiguracionGuardada)=>{
        if(!_ConfiguracionGuardada){
            objresponse.status(400).send({mensaje: "Error al crear la configuración"})
        }
        else
        {
            var idConfig = _ConfiguracionGuardada.id
            Deploy.findOne({ where: {id: idConfig} }).then((_deploy)=> {
                if(!_deploy){
                    objresponse.status(400).send({mensaje: `Error creando la configuración`})
                }
                else
                {
                    objresponse.status(200).send({configuracion: _deploy})
                }
            }).catch((err)=>{
                objresponse.status(500).send({mensaje: "Error consultando el video creado."})
            })
        }
    }).catch((err)=>{
        console.log(`Error creando el la configuración: ${err}`)
        objresponse.status(500).send(`Error al guardar en la base de datos: ${err}`)
    })
}

/*************************************** UPDATE ******************************/
//Actualizar Configuración
function ActualizarConfiguracion(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    var configuracionFromBody = objrequest.body
    Deploy.update(configuracionFromBody, {where:{id:_idConfiguracion} }).then((configActualiado)=>{
        if(!configActualiado){
            objresponse.status(400).send({mensaje: "Error al Actualizar configuración "})
        }
        else{
            objresponse.status(200).send({mensaje: "Configuración actualizada correctamente"})
        }
    }).catch((err)=>{
        console.log(`Error actualizando configuración ${err}`)
        objresponse.status(500).send({mensaje: "Error interno del servicio "})
    })
}

/*************************************** DELETE ******************************/
//Eliminar configuracion
function EliminarConfiguracion(objrequest, objresponse){
    var _idConfiguracion = objrequest.params.id
    Deploy.destroy({where: {despliegue:_idConfiguracion}}).then((_deploy)=>{
        if(_deploy == 1){
            objresponse.status(200).send({mensaje: "Configuración eliminada correctamente"})
        }
        else{
            return objresponse.status(400).send({mensaje: 'Error al eliminar la configuración'})
        }
    }).catch((err) => {
        console.log(`Error eliminando configuración: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio, Error al eliminar la configuración'})
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