var ffmpeg = require('ffmpeg');//video
var fs = require('fs');//eliminar existente
var mailerS =require('./sender_email.js');//enviar correo
var request = require("request");//peticion
var querystring = require('querystring');
var constants = require("../config.js");
var AWS = require('aws-sdk');
function converter (inputVideo,outputVideo,correo,idVideo,callback) {
var respuesta="_";
try {
AWS.config.loadFromPath('../bucket/config.json');
var s3Bucket = new AWS.S3()    
var params = {Key: "media/original/"+inputVideo, Bucket: constants.nombreBucket};
var input = s3Bucket.getObject(params);

var file = require('fs').createWriteStream(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo);
s3Bucket.getObject(params).createReadStream().pipe(file);
/*if (fs.existsSync(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension)) {//elimina video igual existente
    fs.unlinkSync(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
}*/
console.log(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo);
	var process = new ffmpeg(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo);
	process.then(function (video) {
		video
		.setVideoFormat('mp4')
			.save(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension, function (error, file) {
			if (!error){
				/*imagenThumblr(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension,
				constants.rutaMultimediaCron+constants.nombreCarpetaThumb,outputVideo,function (respuestaThumbs) {
				});
				*/
				var form = {
				    estado: 'Procesado',
				    rutaImagenVideo:outputVideo+"_1.jpg",
				    nombreVideoConvertido:outputVideo+".mp4"
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
	console.log(e);
	respuesta="404";
	return  callback(respuesta);
	
}
}
/*
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

}*/
module.exports.name="Group4Converter";
module.exports.converter=converter;

