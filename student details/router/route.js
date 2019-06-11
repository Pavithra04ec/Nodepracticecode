var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var student = require("../controller/studentcontroller.js");


router.get('/api/studentDetails',student.getDt); 
router.get('/api/studentDetails/:id',student.getId);
router.post('/api/studentDetails/post',student.postDt);
router.put('/api/studentDetails/:id',student.putDt); 
router.delete('/api/studentDetails/:id',student.deleteDt); 

const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`server connected ${port}`);
});

module.exports = router;