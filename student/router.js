const express = require('express');
const router = express();
const controller = require('./controller');
var bodyParser = require('body-parser');
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

// get student details from database through.
router.get('/api/studentDetails', controller.getDt);
// get by id in db
router.get('/api/studentDetails/:id', controller.getId);
// post or insert a student details in database
router.post('/api/studentDetails/post', controller.postDt);
// update a student details in database 
router.put('/api/studentDetails/put/:id', controller.putDt);
// delete a student details in database
router.delete('/api/studentDetails/:id', controller.deleteDt);


const mongoose = require('mongoose');
//This  create a database and connect to mongodb server runnig on port : 27017.
mongoose.connect("mongodb://localhost:27017/myDb", { useCreateIndex: true, useNewUrlParser: true }, function (err, db) {
    if (err) {
        return err;
    }
    console.log("connected");
});


const port = process.env.PORT || 8000;
router.listen(port, () => {
    console.log(`server connected ${port}`);
});
module.exports = { router };
