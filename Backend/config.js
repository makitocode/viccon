module.exports = {
    port: process.env.PORT || 2017,
    db: process.env.MONGODB || 'mongodb://localhost:27017/viccon',
 	rutaMultimedia: '/media/',
 	nombreCarpetaOriginal: 'original/',
    nombreCarpetaConvertida: 'conversion/',
    nombreCarpetaThumb: 'thumb/',
    extension:'.mp4',
    pathREST:'http://localhost:2017/api/',
    rutaMultimediaCron: 'C:/Users/Taidy/viccon/public/media/',
}
