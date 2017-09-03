var ffmpeg = require('ffmpeg');//video
var fs = require('fs');//eliminar existente
var mailerS =require('./sender_email.js');//enviar correo
var request = require("request");//peticion
var querystring = require('querystring');
var constants = require("../config.js");


function converter (inputVideo,outputVideo,correo,idVideo,callback) {
var respuesta="_";
try {
if (fs.existsSync(constants.rutaMultimedia+constants.nombreCarpetaConvertida+outputVideo+constants.extension)) {//elimina video igual existente
    fs.unlinkSync(constants.rutaMultimedia+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
}
	var process = new ffmpeg(constants.rutaMultimedia+constants.nombreCarpetaOriginal+inputVideo);
	process.then(function (video) {
		video
		.setVideoFormat('mp4')
		.save(constants.rutaMultimedia+constants.nombreCarpetaConvertida+outputVideo+constants.extension, function (error, file) {
			if (!error){
				imagenThumblr(constants.rutaMultimedia+constants.nombreCarpetaConvertida+outputVideo+constants.extension,
				constants.rutaMultimedia+constants.nombreCarpetaThumb,outputVideo,function (respuestaThumbs) {
				});
				
				var form = {
				    estado: 'Procesado',
				    rutaImagenVideo:outputVideo+"_1.jpg"
    			};

				var formData = querystring.stringify(form);
				
				//llamo el post de actualizacion de video
				require('request').put({
					uri:constants.pathREST+"video/"+idVideo,
					headers: {'content-type' : 'application/x-www-form-urlencoded'},
  					    body: formData
    			},function(err,res,body){
					
					if (err) {
     					 console.log('ErrorPost:', err);
    				} else if (res.statusCode !== 200) {
      					console.log('Error parsing JSONPOST!');
      					
    				  } else {//RESPONDE OK EL SERVICIO POST DE ACTUALIZACION DE ESTADO DE VIDEO
								
    				  			var jsonObj = JSON.parse(body);
								if(jsonObj.mensaje=='Video actualizado correctamente'){
							    //llamo la funcion de envio de correo funciona
									var pa=mailerS.sender;
									pa(correo, function (respuestaCorreo) {
										if(respuestaCorreo=='ok'){
												respuesta="200";
												return  callback(respuesta);	
										}
										
									});

								}
					}
			});
								
			}else{
				respuesta="400";
				return  callback(respuesta);
				
			}
		});
	}, function (err) {
		respuesta="401";
		return  callback(respuesta);
	
	});
} catch (e) {
	respuesta="404";
	return  callback(respuesta);
	
}
}

function imagenThumblr(videoSalida, rutaThumbls, nombreArchivo,callback){
try {
	var process = new ffmpeg(videoSalida);
	process.then(function (video) {
		// Callback mode
		video.fnExtractFrameToJPG(rutaThumbls, {
			frame_rate : 1,
			number : 1,
			file_name : nombreArchivo
		}, function (error, files) {
			if (!error){
				return callback(files[1]);
			}
				
		});
	}, function (err) {
		return callback('');
		console.log('Error: ' + err);
	});
} catch (e) {
	
}

}
module.exports.name="Group4Converter";
module.exports.converter=converter;

