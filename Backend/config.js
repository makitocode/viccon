module.exports = {
    port: process.env.PORT || 80,
    db: process.env.MONGODB || 'mongodb://18.216.188.216:27017/viccon',
    MySql_db: 'Viccon',
    MySql_user: 'root',
    Mysql_pass: 'root',
    MySql_host: 'localhost',
    MySql_port: '8889',
 	rutaMultimedia: '/media/',
    nombreCarpetaOriginal: 'original/',
    nombreCarpetaConvertida: 'conversion/',
    nombreCarpetaThumb: 'thumb/',
    extension:'.mp4',
    pathREST:'https://viccon-r4.herokuapp.com/api/',
    pathAPPjs:'https://viccon-r4.herokuapp.com',
    nombreBucket:'s3.viccon.bucket1',

    rutaMultimediaCron: '/home/ec2-user/viccon/public/media/',

    QueueUrl: 'https://sqs.us-east-2.amazonaws.com/911317221798/sqs-viccon-video-standard',
    QueueTiempoProcesamiento: '40' //40 segundos
}
