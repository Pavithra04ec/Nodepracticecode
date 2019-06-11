//router are guide they tell the client to go to which controller, once a path/url is requested.

const express = require('express');
//router object include methods for routing http request.
const routers = express();
const controller = require('../control/controller');
var path = require('path');
const verifyToken = require('../Authentication/Verifytoken');
const route = require('./nodemailer');
// use method tell the router we can use verifytoken.
//routers.use(verifyToken);
routers.get('/api/products', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//routers.use(route);
// This is used to read all objects in a collection.
routers.get('/get',controller.getProducts);
// This is used to read the objects of specified Id in a collection.
routers.get('/getById', controller.getProductsByStatus);
// This is used to create a new object in a collection.
routers.post('/add', controller.addProduct);
// This is used to update an existing object in a collection.
routers.put('/put', controller.updateProduct);
// This is used to delete the object of a specified Id in a collection.
routers.delete('/delete', controller.deleteProduct);

module.exports = routers;