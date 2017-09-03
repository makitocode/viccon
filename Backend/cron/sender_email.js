var nodemailer = require('nodemailer');
function sender (email,callback) {
try {
// Create the transporter with the required configuration for Gmail
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'desarrollocloud2017@gmail.com',
        pass: 'grupo4Cloud'
    }
});

// setup e-mail data
var mailOptions = {
    from: '"Smartools-Cloud" <desarrollocloud2017@gmail.com>', // sender address (who sends)
    to: email, // list of receivers (who receives) //parametrizar correo de concursante con un function
    subject: 'Tu video ha sido procesado exitosamente!', // Subject line
    text: 'Tu video ha sido procesado exitosamente!', // plaintext body
    html: '<br>Por favor ingresa a la plataforma y comparte tu video' // html body
};
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
    return  callback("error1");
    }else{
     return  callback("ok");   
    }
     
});
} catch (e) {
    return  callback("error2");
}
}
module.exports.name="Group4SenderEmail";
module.exports.sender=sender;
