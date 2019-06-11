const express = require('express');
const router = express();
const path = require('path');
// This will require from control.js file.
const control = require('./control.js');
var bodyParser = require('body-parser');
//Encode the url from the specified file path.
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    // get the html file in the directory.
    res.sendFile(path.join(__dirname + '/index.html'));
});

// This is used to read all objects in a collection.
router.get('/api/details', control.getDt);
// This is used to read the objects of specified Id in a collection.
router.get('/api/details/:id', control.getId);
// This is used to create a new object in a collection.
router.post('/api/insert', control.postDt);
// This is used to update an existing object in a collection.
router.put('/api/update/:id', control.putDt);
// This is used to delete the object of a specified Id in a collection. 
router.delete('/api/delete/:id', control.deleteDt);

const port = process.env.PORT || 3000;
router.listen(port, () => {
    console.log(`server connected ${port}`);
});