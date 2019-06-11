var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Db')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var student = require('./router/route.js');

app.use('/student', student);