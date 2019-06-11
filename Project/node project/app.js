const express = require('express');
const router = express();
const db = require('./model');
const bodyParser = require('body-parser');
const joi = require('joi');
const schema = require('./joi');
var moment = require('moment');
var cors = require('cors');
router.use(cors());


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
    db.user.find({}, (err, result) => {
        res.send(result);
    });
})
router.get('/api/get/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    //console.log(Id);
    db.user.find({ id: Id }, (err, result) => {
        if (!result.length > 0) {
            res.status(404).send('the given id is not found');
        }
        else {
            res.json(result);
            //console.log(result);
        };
    });
})
router.get('/api/mobileno/:MobileNo', (req, res) => {
    const mobile = req.params.MobileNo;
    //var mobileNo =  joi.string().regex(/^\d{10}$/).required()
   if(mobile.length == 10){
       //console.log("hii")
    db.user.find({ MobileNo: mobile }, (err, result) => {
        if (!result.length > 0) {
            res.status(404).send('the given MobileNo is not found');
        }
        else {
            res.json(result);
        };
    });
 }  else{
    res.status(404).send('the given MobileNo is not found');
 }          
});
router.get('/api/dob/:DOB', (req, res) => {
    var dateString = req.params.DOB;
    var dateObj = new Date(dateString);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
    db.user.find({ DOB: momentString }, (err, result) => {
        // if (err) {
        //     return err;
        // }
        if (!result.length > 0) {
            res.status(404).send('the given dob is not found');
        }
        else {
            res.json(result);
        };
    });
})
router.post('/api/post', (req, res) => {
    const language = req.body.Language;
    var dateString = req.body.DOB;
    var dateObj = new Date(dateString);
    //console.log(dateObj);
    var momentObj = moment(dateObj);
    //console.log(momentObj)
    var momentString = momentObj.format('YYYY-MM-DD');
    //moment().format(dateFn);
    const Details = {
        //id: req.body.id,
        Name: req.body.Name,
        Gender: req.body.Gender,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Password: req.body.Password,
        ConfirmPassword: req.body.ConfirmPassword,
        Country: req.body.Country,
        Language: language.toString(),
        //Language: req.body.Language
        DOB: momentString
        //DOB: req.body.DOB
    };
    //console.log(Details)
    joi.validate(Details, schema.SchemaValidation, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        else {
            db.user.create(Details, (err, user) => {
                // if (!user) {
                //     return res.status(404).send("This id is already in use.");
                // }
                if (err) return res.status(404).send(err);
                res.json(user);
            })
        }
    })
});

router.put('/api/put/:id', (req, res) => {
    const language = req.body.Language;
    const Id = req.params.id
    const Details = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Password: req.body.Password,
        ConfirmPassword: req.body.ConfirmPassword,
        Country: req.body.Country,
        Language: language.toString(),
        //Language: req.body.Language
        DOB: req.body.DOB
    };
    //console.log(Details)
    joi.validate(Details, schema.SchemaValidation, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        else {
            db.user.updateOne({ id: Id }, { $set: Details }, (err, user) => {
                if (user.n==0) {
                    return res.status(404).send("There is problem in updating user.");
                }
                res.json(user);
            })
        }
    })
});
router.delete('/api/delete/:id', (req, res) => {
    const Id = req.params.id;
    db.user.deleteOne({ id: Id }, (err, user) => {
        if (user.n == 0) {
            return res.status(404).send("The given id is not found for delete request.");
        }
        res.json(user);
    });
})


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/project", { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }, function (err, db) {
    console.log("connected");
});
const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;