//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Video = require('../Model/Video')



/*************************************** GET ******************************/
//Obtener Videos
function ObtenerVideos(objrequest, objresponse){
    Video.find({}, (err, _video) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la consulta: ${err}`})
        }
        if(!_video){
            objresponse.status(404).send({mensaje: 'El video no existe'})
        }
        objresponse.status(200).send({video: _video})
    })
}
//Obtener video por Id
function ObtenerVideoPorId(objrequest, objresponse){
    var _idVideo = objrequest.params.id
    Video.findById(_idVideo, (err, _video) => {
        if(err){
            return objresponse.status(500).send({mensaje: `Error al realizar la consulta: ${err}`})
        }
        if(!_video){
            objresponse.status(404).send({mensaje: 'El video no existe'})
        }
        objresponse.status(200).send({video: _video})
    })
}
/*************************************** POST ******************************/
//Crear video
function CrearVideo(objrequest, objresponse){
    var _video = new Video()
    _video.nombres = objrequest.body.nombres
    _video.apellidos = objrequest.body.apellidos
    _video.email = objrequest.body.email,
    // _video.fechaCarga = objrequest.body.fechaCarga
    // _video.estado = ''
    _video.rutaVideoOriginal = objrequest.body.rutaVideoOriginal
    _video.rutaVideoConvertido = objrequest.body.rutaVideoConvertido
    _video.mensaje = objrequest.body.mensaje

    //Se almacena el video
    _video.save((err, _VideoGuardado) => {
        if(err){
            objresponse.status(400).send(`Error al guardar en la base de datos: ${err}`)
        }
        else{
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
            objresponse.status(400).send(`Error al actualizar el video : ${err}`)
        }
        objresponse.status(200).send({mensaje: "Video actualizado correctamente"})
    })
}
/*************************************** DELETE ******************************/
//Eliminar video
function EliminarVideo(objrequest, objresponse){
    var idVideo = objrequest.params.id
    Video.findById(idVideo, (err, video) => {
        if(err){
            objresponse.status(400).send(`Error al eliminar el video : ${err}`)
        }
        video.remove(err => {
            if(err){
                objresponse.status(500).send(`Error al eliminar el video : ${err}`)
            }   
            objresponse.status(200).send({mensaje: "Video eliminado correctamente"})
        })
    })
}


//Se exporta el controlador
module.exports ={
    ObtenerVideos,
    ObtenerVideoPorId,
    CrearVideo,
    ActualizarVideo,
    EliminarVideo
}



























