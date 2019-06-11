const express = require ('express');
const router = express();
const controller = require('./controller.js');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); 

router.post('/api/employeeDetails/',controller.postDt); 
router.post('/api/managerDetails/',controller.postDt1);
router.post('/api/address/',controller.postDt2); 

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log(`server connected ${port}`);
});
module.exports = {router};