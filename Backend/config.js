module.exports = {
    port: process.env.PORT || 2017,
    db: process.env.MONGODB || 'mongodb://localhost:27017/viccon'
}
//se parametriza con la ruta del computador
module.exports = Object.freeze({
    rutaMultimedia: 'C:/Users/Taidy/Videos/multimediaViccon/',
    nombreCarpetaOriginal: 'original/',
    nombreCarpetaConvertida: 'conversion/',
    nombreCarpetaThumb: 'thumb/',
    extension:'.mp4'
});