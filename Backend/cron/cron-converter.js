var cron = require('node-cron');//cron
var request = require("request");//peticion
var fs = require('fs');//serializacion del json
var converterVideo =require('./converter.js');// module del grupo 4 para el converter
var constants = require("../config.js");
var querystring = require('querystring');
var currentDate = new Date();


console.log("inicia  " +currentDate);
var task =cron.schedule('* * * * *', function(){//se ejecuta cada minuto
//var task=cron.schedule('*/3 * * * *', function(){//se ejecuta cada 2 minutos
var currentDate2 = new Date();
console.log("inicia llamado cron " +currentDate2);
//var url=constants.pathREST+"video/estado/SinProcesar";
var url = constants.pathAPPjs + "/consultarmensaje";
//console.log(`Url de consulta de msjs en cola: ${url}`);

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('ErrorGet:', err);
    } 
    else if (res.statusCode !== 200) {
      console.log('Error parsing JSONGET!');
    } 
    else {
      //se obtiene el id del video 
      var _idVideo = data.idVideo; 
     // console.log("id video "+ _idVideo);
      
    //  console.log(`imprime prop objeto data: ${Object.keys(data)}`);
      //Se obtiene el id del mensaje 
   //   console.log("id mensaje1 "+ data.idmensaje);
      var _idMensajeCola = data.idmensaje.toString();
//console.log("id mensaje "+ _idMensajeCola);

      //Se llama el api rest para obtener los datos del video
      ConsultaVideo(_idVideo,function (respuestaConsulta) {           
    //    console.log("respuesta "+ respuestaConsulta.nombreVideo);
        
        var p=converterVideo.converter;
        var videoInput=respuestaConsulta.nombreVideo+'.'+respuestaConsulta.nombreExtensionVideoOriginal;
        var videoOutput=respuestaConsulta.nombreVideo;

    p(videoInput,videoOutput,respuestaConsulta.email,respuestaConsulta._id,function (respuestaConversion) {
      console.log(respuestaConversion);
      //saco el mensaje de la cola
      var form = {
           
            idmensaje:_idMensajeCola
          };
              var formData = querystring.stringify(form);
        require('request').post({
          uri:constants.pathAPPjs +'/eliminarmensaje',
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
                body: formData
          },function(err,res,body){
          
          if (err) {
               console.log('ErrorPost f5 SQS:', err);
            } else if (res.statusCode !== 200) {
                console.log('Error parsing JSONPOST!');
                
              } else {//RESPONDE OK EL SERVICIO POST DE ACTUALIZACION DE ESTADO DE VIDEO
                
                   
                console.log("salida mensaje de la cola "+body);
          }
      });

    });

      });
        

    }
});
  
});

//Método que realiza el consumo del api rest para consultar la información del video
function ConsultaVideo(video,callback){
  var url=constants.pathREST+"video/"+video;
  request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
  },(err, res, data) => {
    if (err) {
    console.log('ErrorGet:', err);
    } else if (res.statusCode !== 200) {
        console.log(`Codigo http error: ${res.statusCode}`)
        console.log('Error parsing JSONGET!');
    } else {//traigo el video con el id
        //lo que vas a hacer
        callback(data.video);
      }
    }
  );
}

task.start();