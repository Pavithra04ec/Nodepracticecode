//imports the express library
let express = require('express');
let path = require('path');
let app = express();
//imports the bodyparser
let bodyParser = require('body-parser');
//imports the user module
let user = require('../controller/user');
//use middleware function body-parser
app.use(bodyParser.json());
//parse the incoming request 
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
//app.use('/unit test task',express.static(path.join(__dirname, 'public')));

// app.get('/api', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });


app.route("/api/v1")
    .get(user.getDtl)
    .post(user.postDtl);
app.route("/api/v1/query")
    .get(user.getID)
    .put(user.putDtl)
    .delete(user.deleteDtl);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`the server listen ${port}......`));
//export the module
module.exports = app;