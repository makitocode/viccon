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

//Configuraciones del bodyparser - Parsear objetos del body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //Para adminitr peticiones con json (body)
//Para usar el modulo api
app.use('/api', api)

//para files de concurso y video de aqui
app.use(express.static(path.join(__dirname, 'public')));
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
  form.uploadDir = path.join(__dirname, '/public/images/multimediaViccon/thumb');

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
  form.uploadDir = path.join(__dirname, '/public/images/multimediaViccon/original');

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