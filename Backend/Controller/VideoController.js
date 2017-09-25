//usar los nuevos tipos de variables y características de EMC6
'use strict'

//Para usar el modelo hay q importarlo
const Video = require('../Model/Video')



/*************************************** GET ******************************/
//Obtener Videos
function ConsultarVideos(objrequest, objresponse){
    Video.findAll().then((_video) => {
        if(!_video){
            objresponse.status(404).send({mensaje: 'No existen videos'})
        }
        if(_video.length <= 0)
            objresponse.status(404).send({mensaje: 'No existen videos registrados.'})
        else
        {
            objresponse.status(200).send({video: _video})
        }
      }).catch((err) => {
          console.log(`Error consultando todos los videos: ${err}`)
          objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}
//Obtener video por Id
function ConsultarVideoPorId(objrequest, objresponse){
    var _idVideo = objrequest.params.id
    Video.findOne({ where: {id: _idVideo} }).then((_video)=>{
        if(!_video){
            objresponse.status(404).send({mensaje: 'El video no existe'})
        }
        else{
            objresponse.status(200).send({video: _video})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar el video por id: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Obtener video por estado
function ConsultarVideoPorEstado(objrequest, objresponse){
    var _estado = objrequest.params.estado
    Video.findAll({ where: {estado: _estado} }).then((_videos)=>{
        if(!_videos){
            objresponse.status(404).send({mensaje: 'No existen videos'})
        }
        else{
            objresponse.status(200).send({video: _videos})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar el video por id: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Obtener video por concurso y estado
function ConsultarVideoPorConcursoyEstado(objrequest, objresponse){
    var _idconcurso = objrequest.params.idconcurso
    var _estado = objrequest.params.estado
    Video.findAll({where: {idConcurso:_idconcurso, estado: _estado}}).then((_videos)=>{
        if(!_videos){
            objresponse.status(404).send({mensaje: 'No existen videos'})
        }
        else{
                objresponse.status(200).send({video: _videos})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar el video por concurso y estado: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
    })
}

//Obtener video por concurso
function ConsultarVideoPorConcurso(objrequest, objresponse){
    var _idconcurso = objrequest.params.idconcurso
    Video.findAll({ where: {idConcurso: _idconcurso} }).then((_videos)=>{
        if(!_videos){
            objresponse.status(404).send({mensaje: 'No existen videos'})
        }
        else{
                objresponse.status(200).send({video: _videos})
        }
    }).catch((err) => {
        console.log(`Error generado al consultar el video por id: ${err}`)
        return objresponse.status(500).send({mensaje: 'Error interno del servicio'})
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
    _video.save(_video).then((_VideoGuardado)=>{
        if(!_VideoGuardado){
            objresponse.status(400).send({mensaje: "Error al crear el concurso"})
        }
        else
        {
            console.log(`::::::::::::::::::::::::: Video guardado ok :::::::::::::::::::::::`)
            var idvideo = _VideoGuardado.id
            Video.findOne({ where: {id: idvideo} }).then((_video)=> {
                if(!_video){
                    objresponse.status(400).send({mensaje: `Error creando el video`})
                }
                else
                {
                    objresponse.status(200).send({video: _video})
                }
            }).catch((err)=>{
                objresponse.status(500).send({mensaje: "Error consultando el video creado."})
            })
        }
    }).catch((err)=>{
        console.log(`Error creando el video: ${err}`)
        objresponse.status(500).send({mensaje: "Error creando el video"})
    })
}
/*************************************** UPDATE ******************************/
//Actualizar Video
function ActualizarVideo(objrequest, objresponse){
    var idVideo = objrequest.params.id
    var videoFromBody = objrequest.body
    Video.update(videoFromBody, {where:{id:idVideo} }).then((videoActualizado)=>{
        if(!videoActualizado){
            objresponse.status(400).send({mensaje: "Error al Actualizar el video "})
        }
        else{
            objresponse.status(200).send({mensaje: "Video actualizado correctamente"})
        }
    }).catch((err)=>{
        console.log(`Error actualizando el video ${err}`)
        objresponse.status(500).send({mensaje: "Error interno del servicio "})
    })
}
/*************************************** DELETE ******************************/
//Eliminar video
// function EliminarVideo(objrequest, objresponse){
//     var idVideo = objrequest.params.id
//     Video.findById(idVideo, (err, video) => {
//         if(err){
//             objresponse.status(400).send({mensaje: "Error al eliminar el video"})
//         }
//         video.remove(err => {
//             if(err){
//                 objresponse.status(500).send({mensaje: "Error al eliminar el video"})
//             }   
//             objresponse.status(200).send({mensaje: "Video eliminado correctamente"})
//         })
//     })
// }


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



























