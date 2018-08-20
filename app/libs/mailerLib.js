const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user: 'hanumantchidrawar@gmail.com',
        pass: '9403067517'
    }
});

let mailOptions = {
    from: '"MeetingPlannerApp" hanumantchidrawar@gmail.com',
    to: '',
    subject: 'Greetings',
   // text: 'Welcome the GroupChat Application with node.js and REST API',
    html:""
};

let autoEmail = (reciever, message) =>{

    mailOptions.to = reciever;

    mailOptions.html = message;
    //console.log(mailOptions);

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log('Email Sent' + info.response);
        }
    });

}//end autoEmail

module.exports = {
    autoEmail: autoEmail
}