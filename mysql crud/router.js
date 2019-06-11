var express = require('express');
//router object include methods for routing http request.
var router = express();
var controller = require('./controller');
var verifyToken = require('./verifyToken');
// use method tell the router we can use verifytoken. 
router.use(verifyToken);
// Post method is used to create a new record in a table.
router.post('/api', controller.postDt);
// Get method is used to read all records in a table.
router.get('/api', controller.getDt);
// Get method  is used to read the record of specified Id in a table.
router.get('/api/id', controller.getById);
// Delete method is used to delete the record of a specified Id in a table.
router.delete('/api/id', controller.deleteDt);
// Put method is used to update the record in a table.
router.put('/api/id', controller.putDt);

module.exports = router;