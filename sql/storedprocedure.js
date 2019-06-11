var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'mydb'
});
let sql = 'call customer(done)';
con.query(sql, (err, result) =>{
    if(err) return err;
    console.log(result[0]);
});
con.end();
