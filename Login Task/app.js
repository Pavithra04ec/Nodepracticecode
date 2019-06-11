const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var generator = require('generate-password');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var config = require('./config');
const sgMail = require('@sendgrid/mail');
var verifyToken = require('./verifyTiken')
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,Origin,X-Auth-Token');
    next();
});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
//const con = require('./models');
const joi = require('joi')
const schema = require('./joi');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});
con.connect(() => {
    console.log('db connected');
})

app.get('/api/get', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM managerdb'
    con.query(sql, (err, result) => {
        res.status(200).json(result);
    })
});
app.get('/api/getBy/:Email', (req, res) => {
    const Email = req.params.Email;
    const sql = 'SELECT * FROM managerdb WHERE Email=?'
    con.query(sql, [Email], (err, result) => {
        //Details Not Found
        if (!result || result.length === 0) {
            const sql1 = 'select * from employee where Email=?'
            con.query(sql1, [Email], (err, result1) => {
                if (!result1 || result1.length === 0) {
                    return res.status(404).json({ Error: "invalid Email" });
                }
                res.json(result1)
            })
        }
        else {
            res.json(result)
        }

    })
});
app.post('/api/register', (req, res) => {
    let sql = "INSERT INTO managerdb set ?";
    //Register Details
    let value = {
        ManagerId: req.body.ManagerId,
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Role: req.body.Role
    }
    joi.validate(value, schema, (err, validationresult) => {
        validationresult.Password = bcrypt.hashSync(validationresult.Password);
        if (err) {
            res.status(404).json({ status: 'Error', Error: 'validation error', err });
        }
        else {
            con.query(sql, validationresult, (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: "Error",
                        Error: 'Email Already Exist ', err
                    })
                }
                // if(err){
                //     res.json(err)
                // }
                else {
                    res.status(200).json({
                        status: "Successfully Registered"
                    });
                }
            });
        }
    });
});
app.post('/api/login', (req, res) => {
    var email1 = req.body.Email;
    var Pwd = req.body.Password;
    //gte the Details in Database
    var sql = `SELECT * FROM managerdb where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        if (!userInfo || userInfo.length === 0) {
            const sql1 = 'select * from employee where Email=?'
            con.query(sql1, [email1], (err, result1) => {
                if (!result1 || result1.length === 0) {
                    return res.status(404).json({ Error: "invalid Email" });
                }
                bcrypt.compare(req.body.Password, result1[0].Password, (err, user) => {
                    //console.log(result == true)
                    if (!user == true) return res.status(401).send({ failed: 'Unauthorized Access & Enter Correct Password', token: null });
                    else {
                        var token = jwt.sign({ Email: user.Email }, config.secret, {
                            expiresIn: '24h'
                        });
                        con.query(sql, [email1]);
                        //login Success
                        res.status(200).json({
                            status: "Login Success", token: token, user
                        });
                    };
                });
            })
        }
        else {
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //console.log(result == true)
                if (!result == true) return res.status(401).send({ failed: 'Unauthorized Access & Enter Correct Password', token: null });
                else {
                    const email1 = req.body.Email;
                    var token = jwt.sign({ Email: result.Email }, config.secret, {
                        expiresIn: '24h'
                    });
                    con.query(sql, [email1]);
                    //login Success
                    res.status(200).json({
                        status: "Login Success", token: token, result
                    });
                };
            });
        }
    });
});
app.put('/api/put', verifyToken, (req, res) => {
    //console.log(req.query.Email)
    const sql = "update managerdb set Name=?,MobileNo=?,Age=?,Address=? where Email=?"
    //console.log(req.body)
    con.query(sql, [req.body.Name, req.body.MobileNo, req.body.Age, req.body.Address, req.query.Email], (err, result) => {
        if (err) {
            return res.status(404).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
});
app.get('/api/forgotpassword/:Email', (req, res) => {
    var dynamicOTP = generator.generate({
        length: 4,
        numbers: true,
        uppercase: true
    });
    const email = req.params.Email;
    const sql = `SELECT * FROM managerdb where Email=?`;
    con.query(sql, [email], (err, userInfo) => {
        if (!userInfo || userInfo.length === 0) {
            const sql1 = `SELECT * FROM employee where Email=?`;
            con.query(sql1, [email], (err, result) => {
                if (!result || result.length === 0) {
                    return res.status(404).json({ Error: "invalid Email" });
                }
                else {
                    const OTP = dynamicOTP;
                    //console.log(OTP);
                    // let sql = "insert into logindb.otptable (Email,OTP) values (?,?)"
                    let sql1 = "delete  from logindb.otptable where Email=?"
                    con.query(sql1, [email], (err, resul) => {
                        if (err) {
                            return res.status(404).json(err);
                        }
                        //return res.json(resul)
                    })
                    let sql = "insert into logindb.otptable (Email,OTP) values (?,?)"
                    con.query(sql, [email, OTP], (err, results) => {
                        if (err) {
                            return res.status(404).json(err);
                        }
                        return res.json(results)
                    })
                }
            })
        }
        else {
            const OTP = dynamicOTP;
            //console.log(OTP);
            // let sql = "insert into logindb.otptable (Email,OTP) values (?,?)"
            let sql1 = "delete  from logindb.otptable where Email=?"
            con.query(sql1, [email], (err, resul) => {
                if (err) {
                    return res.status(404).json(err);
                }
                //return res.json(resul)
            })
            let sql = "insert into logindb.otptable (Email,OTP) values (?,?)"
            con.query(sql, [email, OTP], (err, results) => {
                if (err) {
                    return res.status(404).json(err);
                }
                return res.json(results)
            })
            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'pavithra04ec@gmail.com',
            //         pass: 'pavi87540'
            //     }
            // });
            // var mailOptions = {
            //     from: 'pavithra04ec@gmail.com',
            //     to: `${req.params.Email}`,
            //     subject: 'Sending the OTP',
            //     text: 'Your Login OTP',
            //     html: `<h1> OTP   :${dynamicOTP}<h1>`

            // };
            // transporter.sendMail(mailOptions);
            //return res.redirect('/api/otp');
            // sgMail.setApiKey('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');
            // const msg = {
            //     to: 'pavithra04ec@egmail.com',
            //     from: 'pavithradevisubu@gmail.com',
            //     subject: 'Sending with Twilio SendGrid is Fun',
            //     text: 'and easy to do anywhere, even with Node.js',
            //     html: `<strong>OTP   :${dynamicOTP}</strong>`,
            // };
            // sgMail.send(msg);
            // console.log(msg)
        }
    })
});
app.get('/api/otp/:OTP', (req, res) => {
    var OTP = req.params.OTP
    let sql = 'select * from logindb.otptable where OTP=?';
    con.query(sql, [OTP], (err, result) => {
        if (!result || result.length === 0) {
            return res.status(404).json({ Error: "OTP Is in incorrect" });
        }
        res.json(result);
    })
});
app.put('/api/putPass/:Email', (req, res) => {
    var Email = req.params.Email;
    var Password = bcrypt.hashSync(req.body.Password);
    //var Password  = req.body.Password;
    const sql = "update managerdb set Password=? where Email=?"
    //console.log(req.body)
    con.query(sql, [Password, Email], (err, result) => {
        if (result.affectedRows == 0) {
            // console.log(Email);
            // console.log(Password)
            const sql1 = "update employee set Password=? where Email=?"
            con.query(sql1, [Password, Email], (err, user) => {
                if (user.affectedRows == 0) {
                    return res.status(404).json("Invalid Email");
                }
                else {
                    return res.status(200).json(user);
                }
            })

        }
        else {
            res.status(200).json(result);
        }
    })
});
app.get('/api/getManagerEmployee/:ManagerId', (req, res) => {
    let ManagerId = req.params.ManagerId;
    let sql = 'select e.EmpName,e.EmpId,m.ManagerId,e.Role,e.Email from employee e join managerdb m on e.ManagerId=m.ManagerId AND e.ManagerId in (?)';
    con.query(sql, [ManagerId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.json(result);
    })
});
app.get('/api/getbyProjectId/:projectId', (req, res) => {
    let projectId = req.params.projectId;
    let sql = "select p.projectName,m.Name,m.ManagerId,p.projectId from project p join managerdb m on m.projectId=p.projectId AND p.projectId in(?)"
    con.query(sql, [projectId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.json(result);
    })
});
app.get('/api/ManagerDetails', (req, res) => {
    let sql = 'select * from managerdb';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.json(result)
    })
});
app.get('/api/projectdetails', (req, res) => {
    let sql = 'select * from project';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            res.json(result);
        }
    })
});
app.get('/api/ManagerDetails/:Email', (req, res) => {

});
app.post('/api/Manager/Login', (req, res) => {
    var email1 = req.body.Email;
    var Password = req.body.Password;
    //gte the Details in Database
    var sql = `SELECT * FROM managerdb where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        if (!userInfo || userInfo.length === 0) {
            return res.status(404).json({ Error: "invalid Email" });
        }
        else {
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //console.log(result == true)
                if (!result == true) return res.status(401).send({ failed: 'Unauthorized Access & Enter Correct Password', token: null });
                else {
                    const email1 = req.body.Email;
                    var token = jwt.sign({ Email: result.Email }, config.secret, {
                        expiresIn: '24h'
                    });
                    con.query(sql, [email1]);
                    //login Success
                    res.status(200).json({
                        status: "Login Success", token: token, result
                    });
                };
            });
        }
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = app;