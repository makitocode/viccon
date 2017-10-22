//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Concurso = require('../Model/Concurso_mongodb')



/*************************************** GET ******************************/
//Obtener concursos
function ObtenerConcursos(objrequest, objresponse){
    Concurso.find({}, (err, _concurso) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al consultar los concursos'})
        }
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'No existen concursos registrados.'})
        }
        objresponse.status(200).send({concurso: _concurso})
    })
}
//Obtener concurso por Id
function ObtenerConcursoPorId(objrequest, objresponse){
    var _idConcurso = objrequest.params.id
    Concurso.findById(_idConcurso, (err, _concurso) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error generado al consultar el concurso por id ${err}`})
        }
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El concurso no existe'})
        }
        objresponse.status(200).send({concurso: _concurso})
    })
}
//Obtener concursos por id de usuario
function ObtenerConcursosPorIdUsuario(objrequest, objresponse){
    var _idUsuario = objrequest.params.id
    Concurso.find({userId: _idUsuario}, (err, _concurso) =>{
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al realizar la petición'})
        }
        if(!_concurso){
            objresponse.status(404).send({mensaje: 'El usuario no tiene concursos asociados'})
        }
        objresponse.status(200).send({concurso: _concurso})
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
    _concurso.save((err, _ConcursoGuardado) => {
        if(err){
            objresponse.status(400).send({mensaje: 'Error al crear el concurso'})
        }
        else{
                //var nuevaUrl = _ConcursoGuardado.url+'/'+_ConcursoGuardado._id
                var idConcurso = _ConcursoGuardado._id
                // Concurso.update({_id: idConcurso}, {url: nuevaUrl}, (err, concursoActualizado) =>{
                // if(err){
                //     objresponse.status(400).send({mensaje: 'Error al crear el concurso'})
                // }
                Concurso.findById(idConcurso, (err, _concurso) =>{
                    if(err){
                        objresponse.status(400).send({mensaje: 'Error consultando el concurso creado'})
                    }
                    objresponse.status(200).send({concurso: _concurso})
                })    
            }
        }
    )
}
/*************************************** UPDATE ******************************/
//Actualizar Concurso
function ActualizarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id
    var concursoFromBody = objrequest.body
    Concurso.findByIdAndUpdate(idConcurso, concursoFromBody, (err, concursoActualizado) => {
        if(err){
            objresponse.status(400).send({mensaje: "Error al Actualizar el concurso "})
        }
        objresponse.status(200).send({mensaje: "Concurso actualizado correctamente"})
    })
}
/*************************************** DELETE ******************************/
//Eliminar concurso
function EliminarConcurso(objrequest, objresponse){
    var idConcurso = objrequest.params.id

    Concurso.update({_id: idConcurso}, {activo: "false"}, (err, concursoActualizado) =>{
        if(err){
            objresponse.status(400).send({mensaje: "Error al eliminar el concurso "})
        }
        objresponse.status(200).send({mensaje: "Concurso eliminado correctamente"})
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








