// load aws sdk
var aws2 = require('aws-sdk');

// load aws config
aws2.config.loadFromPath('configses.json');
function sender (email,callback) {
try {
// load AWS SES
var ses = new aws2.SES({apiVersion: '2010-12-01'});
var to = ["tj.marrugo10@uniandes.edu.co"]
var from = 'desarrollocloud2017@gmail.com'
ses.sendEmail( 
    { 
        Source: from, 
        Destination: { ToAddresses: to },
        Message: {
            Subject: {
                Data: 'Tu video ha sido procesado'
            },
            Body: {
                Text: {
                    Data: 'Felicitaciones. Tu video se encuentra procesado en el home del concurso. Por favor visita la URL que se te proporciono',
                }
            }
        }
    }
, function(err, data) {
    if(err){
        console.log('Email sent:');
    console.log(err);
    return  callback("error1");
    }else{
     return  callback("ok");   
    }
});

} catch (e) {
    console.log(e);
    return  callback("error2");
}
}

module.exports.name="Group4SenderEmail";
module.exports.sender=sender;
