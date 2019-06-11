const mysql = require('mysql');

//mysql connection
const connection = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});

//exports module
module.exports = connection;