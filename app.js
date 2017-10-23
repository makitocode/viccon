//usar los nuevos tipos de variables y características de EMC6
'use strict'
var fs = require('fs');
//para files de concurso y video de aqui
var path = require('path');
var formidable = require('formidable');
var AWS = require('aws-sdk');
//para files de concurso y video hasta aqui

//Se obtienen los métodos de los servicios de AMAZON
const sqs = require('./Backend/Controller/AmznServices')

//Permite el tratamiento de respuesta y mapeo de los body en las peticiones HTTP
const express = require('express')
const bodyParser = require('body-parser')
//Se instancia el servicio
const app = express()
//Instancia el archivo de rutas
const api = require('./Backend/routes')
var constants = require("./Backend/config.js");

//Configuraciones del bodyparser - Parsear objetos del body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //Para adminitr peticiones con json (body)
//Para usar el modulo api
app.use('/api', api)





app.use(express.static(path.join(__dirname, 'public')));

api.get('pages/concurso_admin.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/concurso_admin.html'));
})

api.get('pages/list_concursos_admin.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/list_concursos_admin.html'));
})

api.get('pages/not_found.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/not_found.html'));
})

api.get('pages/detalle_concurso_admin.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/detalle_concurso_admin.html'));
})

api.get('pages/modificar_concurso.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/modificar_concurso.html'));
})

api.get('pages/detalle_concurso_publico.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/detalle_concurso_publico.html'));
})

api.get('pages/mensaje_exito.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/mensaje_exito.html'));
})

api.get('pages/video_detalle.html',function (req, res){


res.sendFile(path.join(__dirname, 'pages/video_detalle.html'));
})
app.get('pages/crear_concurso.html', function(req, res){
  res.sendFile(path.join(__dirname, 'pages/crear_concurso.html'));
});
app.get('pages/subir_video.html', function(req, res){
  res.sendFile(path.join(__dirname, 'pages/subir_video.html'));
});

app.post('/crear_concurso', function(req, res){
// create an incoming form object
  var form = new formidable.IncomingForm();
  form.on('file', function(field, file) {
    console.log("nombre "+file.name);
   var fileBuffer = fs.readFileSync(file.path);
 AWS.config.loadFromPath('./Backend/bucket/config.json');
var s3Bucket = new AWS.S3()    
var data = {Key: "media/thumb/"+file.name, Body: fileBuffer, Bucket: constants.nombreBucket, ACL: 'public-read'};
s3Bucket.putObject(data, function(err, data){
  if (err) 
      { 
      res.end('error');
      console.log('Error uploading data: ', data+" "+err); 
    } else {
      res.end('success');
      console.log('succesfully uploaded the image!');
    }
});
  });
  form.parse(req);
});

app.post('/subir_video', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  form.on('file', function(field, file) {
      var fileBuffer = fs.readFileSync(file.path);
      AWS.config.loadFromPath('./Backend/bucket/config.json');
      var s3Bucket = new AWS.S3()    
      var data = {Key: "media/original/"+file.name, Body: fileBuffer, Bucket: constants.nombreBucket, ACL: 'public-read'};
      s3Bucket.putObject(data, function(err, data){
          if (err) { 
            res.end('error');
            console.log('Error uploading data: ', data+" "+err); 
          }
          else{
            res.end('success');
            console.log('succesfully uploaded the video!');

          }
        }
      );
  });
  form.parse(req);
});


//Envia mensaje a la cola
app.get('/crearmensaje/:idvideo', sqs.SQSCrearMensaje);


//Obtiene mensaje de la cola
app.get('/consultarmensaje', sqs.SQSConsultarMensaje);
//Elimina mensaje de la cola
app.get('/eliminarmensaje/:idmensaje', sqs.SQSEliminarMensaje);





//Exportar Modulos
module.exports = app