//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Video = require('../Model/Video_mongodb')



/*************************************** GET ******************************/
//Obtener Videos
function ConsultarVideos(objrequest, objresponse){
    Video.find({}, (err, _video) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al realizar la consulta'})
        }
        if(!_video){
            objresponse.status(404).send({mensaje: 'El video no existe'})
        }
        objresponse.status(200).send({video: _video})
    })
}
//Obtener video por Id
function ConsultarVideoPorId(objrequest, objresponse){
    var _idVideo = objrequest.params.id
    Video.findById(_idVideo, (err, _video) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al realizar la consulta'})
        }
        if(!_video){
            objresponse.status(404).send({mensaje: 'El video no existe'})
        }
        objresponse.status(200).send({video: _video})
    })
}

//Obtener video por estado
function ConsultarVideoPorEstado(objrequest, objresponse){
    var _estado = objrequest.params.estado
    Video.find({estado: _estado}, (err, _videos) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al realizar la consulta'})
        }
        else
        {
            if(!_videos){
                objresponse.status(404).send({mensaje: 'No existen videos'})
            }
            objresponse.status(200).send({video: _videos})
        }
    })
}

//Obtener video por concurso y estado
function ConsultarVideoPorConcursoyEstado(objrequest, objresponse){
    var _idconcurso = objrequest.params.idconcurso
    var _estado = objrequest.params.estado
    Video.find({idConcurso:_idconcurso, estado: _estado}, (err, _videos) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error generado al consultar el video por concurso y estado'})
        }
        else{
            if(!_videos){
                objresponse.status(404).send({mensaje: 'No existen videos'})
            }
            objresponse.status(200).send({video: _videos})
        }
    })
}

//Obtener video por concurso
function ConsultarVideoPorConcurso(objrequest, objresponse){
    
    var _idconcurso = objrequest.params.id
    Video.find({idConcurso:_idconcurso}, (err, _video) => {
        if(err){
            return objresponse.status(500).send({mensaje: 'Error al realizar la consulta'})
        }
        if(!_video){
        objresponse.status(404).send({mensaje: 'El concurso no tiene videos asociados.'})    
        }
          objresponse.status(200).send({video: _video})
        
        
    })
}
/*************************************** POST ******************************/
//Crear video
function CrearVideo(objrequest, objresponse){
    var _video = new Video()    
    _video.idConcurso = objrequest.body.idConcurso
    _video.nombreAutor = objrequest.body.nombreAutor
    _video.apellidosAutor = objrequest.body.apellidosAutor
    _video.email = objrequest.body.email,
    _video.nombreVideo = objrequest.body.nombreVideo
    _video.nombreExtensionVideoOriginal = objrequest.body.nombreExtensionVideoOriginal
    _video.nombreVideoConvertido = objrequest.body.nombreVideoConvertido
    _video.mensaje = objrequest.body.mensaje
    _video.fechaCarga = objrequest.body.fechaCarga
    _video.porqueLeGusta = objrequest.body.porqueLeGusta

    //Se almacena el video
    _video.save((err, _VideoGuardado) => {
        if(err){
            objresponse.status(400).send({mensaje: "Error al guardar en la base de datos"})
        }
        else{
            if(!_VideoGuardado){
                objresponse.status(400).send({mensaje: `Error creando el video`})
            }
            objresponse.status(200).send({video: _VideoGuardado})
        }
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Video
function ActualizarVideo(objrequest, objresponse){
    
    var idVideo = objrequest.params.id
    var videoFromBody = objrequest.body
    Video.findByIdAndUpdate(idVideo, videoFromBody, (err, videoActualizado) => {
        if(err){
            objresponse.status(400).send({mensaje: "Error al actualizar el video"})
        }
        else{
            if(!videoActualizado){
                objresponse.status(400).send({mensaje: "Error al Actualizar el video "})
            }
            objresponse.status(200).send({mensaje: "Video actualizado correctamente"})
        }
        
    })
}
/*************************************** DELETE ******************************/
//Eliminar video
function EliminarVideo(objrequest, objresponse){
    var idVideo = objrequest.params.id
    Video.findById(idVideo, (err, video) => {
        if(err){
            objresponse.status(400).send({mensaje: "Error al eliminar el video"})
        }
        video.remove(err => {
            if(err){
                objresponse.status(500).send({mensaje: "Error al eliminar el video"})
            }   
            objresponse.status(200).send({mensaje: "Video eliminado correctamente"})
        })
    })
}


//Se exporta el controlador
module.exports ={
    ConsultarVideos,
    ConsultarVideoPorEstado,
    ConsultarVideoPorConcursoyEstado,
    ConsultarVideoPorConcurso,
    ConsultarVideoPorId,
    CrearVideo,
    ActualizarVideo
    //EliminarVideo
}





