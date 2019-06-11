const express = require('express');
const router = express();
const controller = require('../student/controller');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081/');
    next();
});

// get student details from database through.
router.get('/api/studentDetails/', controller.getDt);
// get by id in db
router.get('/api/studentDetails/:id', controller.getId);
// post or insert a student details in database
router.post('/api/studentDetails/', controller.postDt);
// update a student details in database 
router.put('/api/studentDetails/:id', controller.putDt);
// delete a student details in database
router.delete('/api/studentDetails/:id', controller.deleteDt);

const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`server connected ${port}`);
});
module.exports = { router };