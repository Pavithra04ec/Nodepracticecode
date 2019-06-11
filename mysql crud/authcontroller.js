var express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//jwt is a type of token based authentication. For every single request from the client to server can be accessed through jwt token.
var jwt = require('jsonwebtoken');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var config = require('./config');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});
con.connect(() => {
    console.log('db connected');
})

router.post('/api/register', (req, res) => {
     //hashSync is used to encrypt the data.
    var password = bcrypt.hashSync(req.body.password);
    // var employee = [
    //     [req.body.id,
    //     req.body.name,
    //     req.body.mobileno,
    //     req.body.email,
    //     req.body.projectid,
    //     req.body.comments,
    //         password]
    // ]
    var newemployee = {
        id : req.body.id,
        name : req.body.name,
        mobileno : req.body.mobileno,
        email : req.body.email,
        projectid : req.body.projectid,
        comments : req.body.comments,
        password : password
    }
    //console.log(newemployee);
    //The INSERT INTO statement is used to insert new records in a table.
    con.query('INSERT INTO employee SET ?', newemployee, (err, employeeDt) => {
        if(!employeeDt){
            res.status(404).send('there is a problem in registering employee');
        }
        res.json(employeeDt);
        console.log(employeeDt)
    })
})
router.post('/api/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    //The SELECT statement is used to select data from a database.
    con.query('SELECT * FROM employee WHERE email = ?',[email], function (err, user) {
        if (!user) return res.status(404).send('No user found.');
        //compareSync is used to compare data and encrypted to be compared
        var passwordIsValid = bcrypt.compareSync(password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        //jwt.sign will generate a JWT token and assign it to a user object.
        var token = jwt.sign({ email: user.email }, config.secret, {
            expiresIn: '24h'
        });
        //console.log(token);
        res.status(200).send({ auth: true, token: token, user });
    });
})
module.exports = router;