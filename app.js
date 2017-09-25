//usar los nuevos tipos de variables y características de EMC6
'use strict'
var fs = require('fs');
//para files de concurso y video de aqui
var path = require('path');
var formidable = require('formidable');
//para files de concurso y video hasta aqui

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
//nuevo de aqui
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

//nuevo hasta aqui
/////esto es lo viejo
app.get('pages/crear_concurso.html', function(req, res){
  res.sendFile(path.join(__dirname, 'pages/crear_concurso.html'));
});
app.get('pages/subir_video.html', function(req, res){
  res.sendFile(path.join(__dirname, 'pages/subir_video.html'));
});

app.post('/crear_concurso', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  //form.uploadDir = path.join(__dirname, 'C:/Users/Taidy/videosViccon/multimediaViccon/thumb');
  form.uploadDir = "./public"+constants.rutaMultimedia+constants.nombreCarpetaThumb;

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.post('/subir_video', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  //form.uploadDir = path.join(__dirname, '/public/images/multimediaViccon/original');
  form.uploadDir="./public"+constants.rutaMultimedia+constants.nombreCarpetaOriginal;

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

//para files de concurso y video hasta aqui


//Exportar Modulos
module.exports = app