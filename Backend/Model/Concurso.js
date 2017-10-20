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
const ConcursoSchema = connection.define('Concurso', {
    userId: {type: Sequelize.INTEGER, allowNull: false, required:true},
    rutaMultimedia: {type: Sequelize.STRING, defaultValue: config.rutaMultimedia},
    nombreCarpetaOriginal: {type: Sequelize.STRING, defaultValue: config.nombreCarpetaOriginal},
    nombreCarpetaConvertida: {type: Sequelize.STRING, defaultValue: config.nombreCarpetaConvertida},
    nombreCarpetaThumb: {type: Sequelize.STRING, defaultValue: config.nombreCarpetaThumb},
    nombre: {type: Sequelize.STRING, allowNull: false},
    imagen: {type: Sequelize.STRING},
    url: {type: Sequelize.STRING},
    fechaInicio: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    fechaFin: {type: Sequelize.DATE},
    premio: {type: Sequelize.STRING},
    activo: {type: Sequelize.BOOLEAN, defaultValue:true}
  }, {
      timestamps: false,
      freezeTableName: true, //Evita que mysql pluralice el nombre de la BD
  });

ConcursoSchema.sync({logging: console.log}).then(function(){
    console.log(`Modelo Concurso Actualizado`)
}).catch((err)=>{
    console.log(`Error sincronizando el modelo Concurso ${err}`)
})

//Para exportar el modelo
module.exports = ConcursoSchema