var cron = require('node-cron');//cron
var request = require("request");//peticion
var fs = require('fs');//serializacion del json
var converterVideo =require('./converter.js');// module del grupo 4 para el converter
var constants = require("../config.js");

var task =cron.schedule('* * * * *', function(){//se ejecuta cada minuto
//var task =cron.schedule('0 0 */1 * * *', function(){//se ejecuta cada 2  horas	
console.log("inicia llamado cron");
var url=constants.pathREST+"video/estado/SinProcesar";
request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('ErrorGet:', err);
    } else if (res.statusCode !== 200) {
      console.log('Error parsing JSONGET!');
    } else {
      //traigo la lista de "video" y valido si tiene videos por procesar
      for (var i = 0 ; i <data.video.length; i++) {
      	//llamo el converter.js y le envio los parametros de video original, video convertido, correo y _id
      	var p=converterVideo.converter;
        var videoInput=data.video[i].nombreVideo+data.video[i].nombreExtensionVideoOriginal;
        var videoOutput=data.video[i].nombreVideo;

		p(videoInput,videoOutput,data.video[i].email,data.video[i]._id,function (respuestaConversion) {
		if(respuestaConversion=='200'){//convierte ok todo y envia notificacion
				console.log("resp video: "+respuestaConversion);
		}else{
      console.log(respuestaConversion);
    }
		});
	  };
    }
});
  
});

task.start();