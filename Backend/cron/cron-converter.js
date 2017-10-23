var cron = require('node-cron');//cron
var request = require("request");//peticion
var fs = require('fs');//serializacion del json
var converterVideo =require('./converter.js');// module del grupo 4 para el converter
var constants = require("../config.js");

var task =cron.schedule('* * * * *', function(){//se ejecuta cada minuto
//var task =cron.schedule('0 0 */1 * * *', function(){//se ejecuta cada 2  horas  
console.log("inicia llamado cron");
//var url=constants.pathREST+"video/estado/SinProcesar";
var url = constants.pathAPPjs + "/consultarmensaje";
console.log(`Url de consulta de msjs en cola: ${url}`);

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
      console.log("id video "+ _idVideo);
      
      console.log(`imprime prop objeto data: ${Object.keys(data)}`);
      //Se obtiene el id del mensaje 
      var _idMensajeCola = data.idmensaje.toString();
      console.log("id mensaje "+ _idMensajeCola);

      //Se llama el api rest para obtener los datos del video
      ConsultaVideo(_idVideo,function (respuestaConsulta) {           
        console.log("respuesta "+ respuestaConsulta.nombreVideo);
        
        //EL CONVERSOR SE LLAMA DESPUES
        //lo que responda el sevicio

        //llamo el converter.js y le envio los parametros de video original, video convertido, correo y _id
        //* * * * respuestaConsultagetvideo
  /*      var p = converterVideo.converter;
        var videoInput = respuestaConsulta.nombreVideo+'.'+respuestaConsulta.nombreExtensionVideoOriginal;
        var videoOutput = respuestaConsulta.nombreVideo;
        p(videoInput,videoOutput,respuestaConsulta.email,_idVideo,function (respuestaConversion) {
            console.log("resp video: "+respuestaConversion);
            //saco mensaje de la cola
*/
        /*
        if(respuestaConversion=='200'){//convierte ok todo y envia notificacion
            console.log("resp video: "+respuestaConversion);
        }else{
          console.log(respuestaConversion);
        }*/
//        });

      });
        

    }
});
  
});


function ConsultaVideo(video,callback){
  var retorno="_";
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