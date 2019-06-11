const express = require('express');
const router = express();
const bodyParser = require('body-parser');
var cors = require('cors');
var joi = require('joi')
var schema = require('./joi')
router.use(cors());
var jwt = require('jsonwebtoken');
var config = require('./config');
var verifyToken = require('./verifyToken')
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});
con.connect(() => {
    console.log('db connected');
})

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/api', (req, res) => {
    let sql = 'select * from employee';
    con.query(sql, (err, result) => {
        res.json(result);
    })
})
router.get('/api/count', (req, res) => {
    let sql = 'select count(*) AS NoOfuser from employee'
    con.query(sql, (err, result) => {
        res.json(result);
    })
})
router.post('/api/post', (req, res) => {
    joi.validate(req.body, schema, (err, validationResult) => {
        //console.log(validationResult)
        if (err) {
            return res.status(404).json(err);
        } else {
            let sql = "insert into logindb.employee(EmpId,EmpName,Role,Password,ManagerId,Email) values ?"
            con.query(sql, [validationResult.map(item => [item.EmpId, item.EmpName, item.Role, item.Password,item.ManagerId,item.Email])],
                (err, result) => {
                    //console.log(result)
                    if (err) {
                        return res.status(404).json(err);
                    }
                    // if (!result) {
                    //     return res.status(404).send("This id is already in use.");
                    // }
                    res.json(result);

                })
        }
    })

});
router.put('/api/put/:EmpId', (req, res) => {
    var EmpId = req.params.EmpId;
    con.query('UPDATE employeedb.employee SET ? where EmpId=?', [req.body,EmpId], function (error, results) {
        if (error) return error;
        res.json(results);
      });

    // })
})
router.delete('/api/delete/:EmpId', (req, res) => {
    let sql = 'call employee_delete(?)';
    //let sql = 'delete from employee where EmpId in (?)'
    con.query(sql, [req.params.EmpId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        // if (result.affectedRows == 0) {
        //     return res.status(404).send("The given id is not found for delete request.");
        // }
        res.send(result);
    })
});
router.delete('/api/deletebyId', (req, res) => {
    let sql = 'delete from employee where EmpId in (?)'
    console.log(req.query.EmpId)
    var querysql = JSON.parse(req.query.EmpId)
    console.log(querysql)
    con.query(sql, [querysql], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        // if (result.affectedRows == 0) {
        //     return res.status(404).send("The given id is not found for delete request.");
        // }
        res.send(result);
    })
});
router.get('/api/Employeedetails/:ManagerId',(req,res)=>{
    let ManagerId = req.params.ManagerId;
    let sql = "select e.EmployeeName,e.EmpId,e.Role,e.PreOrganization from employee e join managerdb m on e.ManagerId=m.ManagerId AND m.ManagerId in(?)"
    con.query(sql, [ManagerId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.json(result);
    })
});
router.post('/api/EmployeeDetails/add',(req,res)=>{
    let sql = "INSERT INTO employee set ?";
    //Register Details
    let value = {
        EmpId: req.body.EmpId,
        EmpName: req.body.EmpName,
        Role: req.body.Role,
        ManagerId: req.body.ManagerId,
        Email:  req.body.Email,
        Password:  req.body.Password
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
router.post('/api/Employee/Login', (req, res) => {
    var email1 = req.body.Email;
    var Password = req.body.Password;
    //gte the Details in Database
    var sql = `SELECT * FROM employee where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        //if(err) return res.json(err)
        if (!userInfo || userInfo.length === 0) {
                    return res.status(404).json({ Error: "invalid Email" });
        }
        else {
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //if(err) return res.status(404).json(err)
                //console.log(result == true)
                if (!result == true) return res.status(401).send({ err,failed: 'Unauthorized Access & Enter Correct Password', token: null });
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
router.put('/api/Employee/update/:Email', (req, res) => {
    var Email = req.params.Email;
    con.query('UPDATE employee SET ? where Email=?', [req.body,Email], function (error, results) {
        if(results.affectedRows==0) return res.json('Invalid Email');
        if (!results && results.length ===0) return res.json('Invalid Email');
        res.json(results);
      });

    // })
})

const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;