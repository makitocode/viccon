// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('config.json');
function sender (email,callback) {
try {
// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

// send to list
//var to = ['desarrollocloud2017@gmail.com']
var to = [email]
// this must relate to a verified SES account
var from = 'desarrollocloud2017@gmail.com'



// this sends the email
// @todo - add HTML version
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
