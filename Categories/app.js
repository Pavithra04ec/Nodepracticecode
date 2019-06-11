const express = require('express');
const router = express();
const bodyParser = require('body-parser');
var cors = require('cors');
router.use(cors());
var joi = require('joi');
var schema = require('./joi')
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'category'
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
    let sql = 'select * from categories';
    con.query(sql,
        (err, result) => {
            if (err) {
                return res.status(404).json(err);
            }
            //console.log(result)
            res.json(result);

        })
})
router.get('/api/:CategoryId', (req, res) => {
    let sql = 'select * from categories where CategoryId=?';
    con.query(sql, [req.params.CategoryId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.json(result);
    })
})
router.post('/api/post', (req, res) => {
    // var user = {
    //    Users: req.body.Users
    // }  
    var user = req.body.Users;
    //console.log(user)
    //var jsonData = JSON.stringify(user);
    //var jsonData = user.toString();
    //console.log("jsonData",jsonData)
    var data = {
        CategoryName: req.body.CategoryName,
        Users: user.toString()
    }
    console.log(data)
    let sql = 'INSERT INTO categories SET ?'
    con.query(sql, [data],
        (err, result) => {
            if (err) {
                return res.status(404).json(err);
            }
            //console.log(result)
            res.json(result);

        })
})
router.put('/api/put/:CategoryId', (req, res) => {
    var Category = req.params.CategoryId;
    // var user = {
    //    Users: req.body.Users
    // }  
    var user = req.body.Users;
    console.log(user)
    //var jsonData = JSON.stringify(user);
    var jsonData = user.toString();
    console.log("jsonData", jsonData)
    var data = {
        CategoryName: req.body.CategoryName,
        Users: jsonData
    }
    console.log(data)
    let sql = 'update  categories set ? where CategoryId= ?'
    con.query(sql, [data, Category],
        (err, result) => {
            if (err) {
                return res.status(404).json(err);
            }
            //console.log(result)
            res.json(result);

        })
})
router.delete('/api/delete/:CategoryId', (req, res) => {
    let sql = 'delete from categories where CategoryId=?'
    con.query(sql, [req.params.CategoryId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.send(result);
    })
})

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;