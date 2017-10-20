'user strict'

var config = require('../config')
//db
const mysql = require('mysql2')
const Sequelize = require('sequelize')
const connection = new Sequelize(config.MySql_db, config.MySql_user, config.Mysql_pass, 
                  {
                    host: config.MySql_host,
                    dialect: 'mysql',
                    port: config.MySql_port
                  });

//Modelo 
const VideoSchema = connection.define('Video', {
    nombreAutor: {type: Sequelize.STRING},
    idConcurso: {type: Sequelize.INTEGER, allowNull: false, required:true},
    apellidosAutor: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING, lowercase: true},
    fechaCarga: {type: Sequelize.DATE}, 
    fechaProcesado: {type: Sequelize.DATE},
    estado: {type: Sequelize.STRING, enum: ['Procesado', 'SinProcesar'], defaultValue: 'SinProcesar'},
    nombreVideo: {type: Sequelize.STRING},
    rutaImagenVideo: {type: Sequelize.STRING, defaultValue: ''},
    nombreExtensionVideoOriginal: {type: Sequelize.STRING},
    nombreVideoConvertido: {type: Sequelize.STRING, defaultValue: ''}, //solo nombre sin extensión
    mensaje: {type: Sequelize.STRING},
    porqueLeGusta: {type: Sequelize.STRING},
    estaEnProcesamiento: {type: Sequelize.BOOLEAN, defaultValue: false}
  }, {
      timestamps: false,
      freezeTableName: true, //Evita que mysql pluralice el nombre de la BD
  });

VideoSchema.sync({logging: console.log}).then(function(){
    console.log(`Modelo Video Actualizado`)
}).catch((err)=>{
    console.log(`Error sincronizando el modelo Video ${err}`)
})
    
//Para exportar el modelo
module.exports = VideoSchema