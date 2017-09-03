//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Concurso = require('../Model/Concurso')



/*************************************** GET ******************************/
//Obtener concursos
function ObtenerConcursos(objrequest, objresponse){
    Concurso.find({}, (err, _concurso) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El concurso no existe'})
        }
        objresponse.status(200).send({concurso: _concurso})
    })
}
//Obtener concurso por Id
function ObtenerConcursoPorId(objrequest, objresponse){
    var _idConcurso = objrequest.params.id
    Concurso.findById(_idConcurso, (err, _concurso) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la petición: ${err}`})
        }
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El concurso no existe'})
        }
        objresponse.status(200).send({concurso: _concurso})
    })
}
/*************************************** POST ******************************/
//Crear concurso
function CrearConcurso(objrequest, objresponse){
    var _concurso = new Concurso()
    _concurso.nombre = objrequest.body.nombre
    _concurso.imagen = objrequest.body.imagen
    _concurso.url = objrequest.body.url,
    _concurso.fechaInicio = objrequest.body.fechaInicio
    _concurso.fechaFin = objrequest.body.fechaFin
    _concurso.premio = objrequest.body.premio

    //Se almacena el concurso
    _concurso.save((err, _ConcursoGuardado) => {
        if(err){
            objresponse.status(400).send(`Error al guardar en la base de datos: ${err}`)
        }
        else{
            objresponse.status(200).send({concurso: _ConcursoGuardado})
        }
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Concurso
function ActualizarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id
    var concursoFromBody = objrequest.body
    Concurso.findByIdAndUpdate(idConcurso, concursoFromBody, (err, concursoActualizado) => {
        if(err){
            objresponse.status(400).send(`Error al actualizar el concurso : ${err}`)
        }
        objresponse.status(200).send({mensaje: "Concurso actualizado correctamente"})
    })
}
/*************************************** DELETE ******************************/
//Eliminar concurso
function EliminarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id
    Concurso.findById(idConcurso, (err, concurso) => {
        if(err){
            objresponse.status(400).send(`Error al eliminar el concurso : ${err}`)
        }
        concurso.remove(err => {
            if(err){
                objresponse.status(500).send(`Error al eliminar el concurso : ${err}`)
            }   
            objresponse.status(200).send({mensaje: "Concurso eliminado correctamente"})
        })
    })
}


//Se exporta el controlador
module.exports ={
    ObtenerConcursos,
    ObtenerConcursoPorId,
    CrearConcurso,
    ActualizarConcurso,
    EliminarConcurso
}



























