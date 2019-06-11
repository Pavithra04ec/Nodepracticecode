var nodemailer = require('nodemailer');
var express = require('express');
var route = express();

route.post('/sendmail', (req, res) => {
    console.log("API Status ", this.status);
    const value = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pavithra04ec@gmail.com',
            pass: 'pavi87540'
        }
    });

    var mailOptions = {
        from: 'pavithra04ec@gmail.com',
        to: 'pavithradevisubu@gmail.com',
        subject: 'Sending the product details',
        text: "text"

    };
    transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
            res.status(404).json({
                status: "Error"
            })
        } else {
            res.status(200).json('Email sent: ' + result.response);
        }
    });
})
// route.post('/sendmail',(req,res)=>{
//     const value = req.body;
//     console.log(value);
// })
module.exports = route;