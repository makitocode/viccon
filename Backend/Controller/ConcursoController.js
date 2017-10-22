//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Concurso = require('../Model/Concurso')



/*************************************** GET ******************************/
//Obtener concursos
function ObtenerConcursos(objrequest, objresponse){
    Concurso.findAll().then((_Concursos) => {
        if(!_Concursos){
            objresponse.status(404).send({mensaje: 'No existen concursos'})
        }
        if(_Concursos.length <= 0)
            objresponse.status(404).send({mensaje: 'No existen concursos registrados.'})
        else
        {
            objresponse.status(200).send({concurso: _Concursos})
        }
      }).catch((err) => {
          console.log(`Error generado al consultar todos los concursos: ${err}`)
          objresponse.status(500).send({mensaje: 'Error interno del servicio'})
      })
}
//Obtener concurso por Id
function ObtenerConcursoPorId(objrequest, objresponse){
    var _idConcurso = objrequest.params.id
    Concurso.findOne({ where: {id: _idConcurso} }).then((_concurso)=>{
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El concurso no existe'})
        }
        else{
            if(_concurso.activo){
                objresponse.status(200).send({concurso: _concurso})
            }
            else{
                objresponse.status(200).send({mensaje: 'El concurso ha caducado'})
            }
        }
    }).catch((err) => {
        console.log(`Error generado el consultar el concurso por id: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Obtener concursos por id de usuario
function ObtenerConcursosPorIdUsuario(objrequest, objresponse){
    var _idUsuario = objrequest.params.id
    Concurso.findAll({ where: {userId: _idUsuario, activo: true} }).then((_concurso)=>{
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El usuario no tiene concursos asociados'})
        }
        else{
            objresponse.status(200).send({concurso: _concurso})
        }
    }).catch((err) => {
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})   
    })
}
/*************************************** POST ******************************/
//Crear concurso
function CrearConcurso(objrequest, objresponse){
    var _concurso = new Concurso()
    _concurso.userId = objrequest.body.userId
    _concurso.nombre = objrequest.body.nombre
    _concurso.imagen = objrequest.body.imagen
    _concurso.url = objrequest.body.url,
    _concurso.fechaInicio = objrequest.body.fechaInicio
    _concurso.fechaFin = objrequest.body.fechaFin
    _concurso.premio = objrequest.body.premio
    //_concurso.activo = objrequest.body.activo
    //Se almacena el concurso
    _concurso.save(_concurso).then((_ConcursoGuardado)=>{
        if(!_ConcursoGuardado){
            objresponse.status(400).send({mensaje: "Error al crear el concurso"})
        }
        else
        {
            console.log(`::::::::::::::::::::::::: usuario guardado ok :::::::::::::::::::::::`)
            var idConcurso = _ConcursoGuardado.id
            Concurso.findOne({ where: {id: idConcurso} }).then((_concursoActualizadoOk)=> {
                if(!_concursoActualizadoOk){
                    objresponse.status(400).send({mensaje: `Error al consultar el concurso creado`})
                }
                else
                {
                    objresponse.status(200).send({concurso: _concursoActualizadoOk})
                }
            }).catch((err)=>{
                objresponse.status(500).send({mensaje: "Error consultando el concurso creado."})
            })
        }
    }).catch((err)=>{
        console.log(`Error creando el concurso: ${err}`)
        objresponse.status(500).send({mensaje: "Error creando el concurso"})
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Concurso
function ActualizarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id
    var concursoFromBody = objrequest.body
    Concurso.update(concursoFromBody, {where:{id:idConcurso} }).then((_concursoActualizado)=>{
        if(!_concursoActualizado){
            objresponse.status(400).send({mensaje: "Error al Actualizar el concurso "})
        }
        else{
            objresponse.status(200).send({mensaje: "Concurso actualizado correctamente"})
        }
    }).catch((err)=>{
        console.log(`Error actualizando el concurso ${err}`)
        objresponse.status(500).send({mensaje: "Error interno del servicio "})
    })
}
/*************************************** DELETE ******************************/
//Eliminar concurso
function EliminarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id
    Concurso.update({activo: false}, {where:{id:idConcurso} }).then((_concursoActualizado)=>{
        if(!_concursoActualizado){
            objresponse.status(400).send({mensaje: "Error al eliminar el concurso "})
        }
        else{
            objresponse.status(200).send({mensaje: "Concurso eliminado correctamente"})
        }
    }).catch((err)=>{
        console.log(`Error actualizando el concurso ${err}`)
        objresponse.status(500).send({mensaje: "Error interno del servicio "})
    })
}


//Se exporta el controlador
module.exports ={
    ObtenerConcursos,
    ObtenerConcursoPorId,
    ObtenerConcursosPorIdUsuario,
    CrearConcurso,
    ActualizarConcurso,
    EliminarConcurso
}



























