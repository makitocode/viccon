var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');//eliminar existente
var request = require("request");//peticion
var querystring = require('querystring');
var constants = require("../config.js");
var AWS = require('aws-sdk'); //aws mail

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
                        .on('start', function() { 
                              console.log('inicia conversion ');
                        })
                        .on('error', function(err) {
                              console.log('An error occurred: ' + err.message);
                        })
                        .on('end', function() {
                              console.log('finaliza conversion ');
                              //actualiza la bd
                              var currentDate3 = new Date();
                              var form = {
                                    estado: 'Procesado',
                                    rutaImagenVideo:outputVideo+"_1.jpg",
                                    nombreVideoConvertido:outputVideo+".mp4",
                                    fechaProcesado:currentDate3.toString()
                              };
                            var formData = querystring.stringify(form);
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
                                                        //inicia envio de mail
                                                        const sgMail = require('@sendgrid/mail');//heroku sengrid mail
                                                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                                                        const msg = {
                                                          to: correo,
                                                          from: 'desarrollocloud2017@gmail.com',
                                                          subject: 'Tu video ha sido procesado :)',
                                                          text: 'Felicitaciones. Tu video se encuentra procesado en el home del concurso. Por favor visita la URL que se te proporciono',
                                                          html: '<strong>Felicitaciones. Tu video se encuentra procesado en el home del concurso. Por favor visita la URL que se te proporciono</strong>',
                                                        };
                                                      sgMail.send(msg);
  
                                                        
                                                     
                                                   }//finaliza envio de mail
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
              console.log('Error uploading data: ', data+" "+err); 
            } else {
                //cuando el bucket responde borro el video original,convertido 
                fs.unlinkSync(constants.rutaMultimediaCron+constants.nombreCarpetaOriginal+inputVideo);
                fs.unlinkSync(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
                return  callback("200");  
          }
    });
}).save(constants.rutaMultimediaCron+constants.nombreCarpetaConvertida+outputVideo+constants.extension);
}else{
      console.log("todavia no esta el video");
}    
}, 7000);
} catch (e) {
console.log(e);
respuesta="404";
return  callback(respuesta);
}
}
module.exports.name="Group4Converter";
module.exports.converter=converter;

