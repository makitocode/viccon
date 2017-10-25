var ffmpeg = require('fluent-ffmpeg');
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

setTimeout(function() {
if (fs.existsSync(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo)) {//elimina video igual existente

    var proc = ffmpeg(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo)
  .videoCodec('libx264')
  .audioCodec('libmp3lame')
 
  .on('start', function() { })
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
  

//actuazlia la bd
  var currentDate3 = new Date();
  console.log("ID VIDEO :"+idVideo+" Fecha procesado "+currentDate3.toString());
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
                    return  callback(respuesta);  
							    //llamo la funcion de envio de correo funciona
                  /*
									var pa=mailerS.sender;
									pa(correo, function (respuestaCorreo) {
										if(respuestaCorreo=='ok'){
												respuesta="200";
												return  callback(respuesta);	
										}
										
									});
*/
								}
					}
			});

//envia el video convertido al bucket

var fileBuffer = fs.readFileSync(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
 AWS.config.loadFromPath('../bucket/config.json');
var s3Bucket = new AWS.S3()    
var data = {Key: "media/conversion/"+outputVideo+constants.extension, Body: fileBuffer, Bucket: constants.nombreBucket, ACL: 'public-read'};
s3Bucket.putObject(data, function(err, data){
  if (err) 
    { 
     // res.end('error');
      console.log('Error uploading data: ', data+" "+err); 
    } else {
   //   res.end('success');
      
      //vuando el bucket responde borro el video original,convertido 
     fs.unlinkSync(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo);
        fs.unlinkSync(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
        return  callback("200");  
      //llamo la cola de Mguel y borro el mensaje
    }
});

  })
  .save(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
  

}else{
	console.log("todavia no esta el video");
}    
}, 2000);


} catch (e) {
	console.log(e);
	respuesta="404";
	return  callback(respuesta);
	
}
}

module.exports.name="Group4Converter";
module.exports.converter=converter;

