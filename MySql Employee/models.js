var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
})
con.connect(function (err) {
    if(err) throw err;
    console.log('connected');
    let create = `create table datadb(
        Name VARCHAR(255),
        Email VARCHAR(255),
        MobileNo BIGINT,
        Age INT,
        Address VARCHAR(255),
        Password VARCHAR(255)
    )`
    con.query(create,(err, result) =>{
        if(err) throw err;
        console.log('table created')
    })
})

