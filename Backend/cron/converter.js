var ffmpeg = require('ffmpeg');//video
var fs = require('fs');//eliminar existente
var mailerS =require('./sender_email.js');//enviar correo
var request = require("request");//peticion
var constants = require("../config.js");
//console.log(constants.MY_CONSTANT); // 'some value'

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
				var jsonDataObj = {'estado': 'hey dude'};
			//llamo el post de actualizacion de video
				require('request').post({
					uri:"http://localhost:2017/api/video/"+idVideo,
					headers: {'content-type' : 'application/x-www-form-urlencoded'},
  					   body: jsonDataObj
    					
        
						
				},function(err,res,body){
					
					if (err) {
     					 console.log('ErrorPost:', err);
    				} else if (res.statusCode !== 200) {
      					console.log('Error parsing JSONPOST!');
    				  } else {//RESPONDE OK EL SERVICIO POST DE ACTUALIZACION DE ESTADO DE VIDEO
								
    				  			var jsonObj = JSON.parse(body);
								if(jsonObj.mensaje=='convertido'){
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

module.exports.name="Group4Converter";
module.exports.converter=converter;

