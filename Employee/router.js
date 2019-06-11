const express = require('express');
//router object include methods for routing http request.
const router = express();
const controller = require('./controller.js');
// body-parser is a middleware function for handling json,raw text, url encoded form data.
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
//var moment = require('moment-business-days');
// var startOfWeek = moment().startOf('week').toString();
// var endOfWeek = moment().endOf('week').toDate();

// This is used to read all objects in a collection.
router.get('/api', controller.getEmployee);

// This is used to read the objects of specified Id in a collection.
router.get('/api/:employeeId', controller.getEmployeeById);

// This is used to create a new object in a collection.
router.post('/api', controller.postEmployee);

// This is used to update an existing object in a collection.
router.put('/api/:employeeId', controller.putEmployee);

// This is used to delete the object of a specified Id in a collection.
router.delete('/api/:employeeId', controller.delEmployee);

// we will make server configuration on the specified port.
const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports =  router ;