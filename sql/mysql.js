var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'myDb'
});
// con.connect(function (err) {
//     if (err) throw err;
//     console.log('connected');
//     con.query("CREATE DATABASE myDb", (err, result) => {
//         if (err) throw err;
//         console.log('database created');
//     });
// })
// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),address VARCHAR(255))";
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log('table created');
//     })
// })
// con.connect(function (err) {
//     if(err) throw err;
//     var sql = "insert into customers (name, address) values ?";
//     var values = [
//         ['pavi', 'trikoilur'],
//         ['ajith', 'madurai'],
//         ['swetha', 'chennai'],
//         ['vanamali' , 'tiruvallur']
//     ]
//     con.query(sql,[values], (err, result) =>{
//         if(err) throw err;
//         console.log('row inserted :', result.affectedRows);
//     })
// });
// con.connect( function (err) {
//     if(err) throw err;
//     var sql1 = "insert into customers (name , address) values ('saguni', 'erode')";
//     con.query(sql1, (err, result) =>{
//         if(err) throw err;
//         console.log('1 row created');
//     })
// })
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DROP TABLE cunstomers";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table deleted");
//     });
//   });
// con.connect(function (err) {
//     if(err) throw err;
//     con.query("select * from customers", (err, result) =>{
//         if (err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err) {
//     if(err) throw err;
//     con.query("select name, address from customers", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("select name, address from customers", (err, result, fields) =>{
//         if(err) throw err;
//         console.log(fields);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("select * from customers where address like 't%'", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("select * from customers where address = 'madurai'", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// var adr = 'chennai';
// con.connect(function (err){
//     if(err) throw err;
//     var sql ="select * from customers where address ="+ mysql.escape(adr);
//     con.query(sql, (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// var name = 'swetha';
// var adr = 'trikoilur';
// con.connect(function (err){
//     if(err) throw err;
//     var sql = "select * from customers where name =? or address =?";
//     con.query(sql, [name, adr], (err,result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err) {
//     if(err) throw err;
//     con.query("select * from customers order by name", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("select * from customers order by name desc", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("delete from customers where name ='devi'", (err, result) =>{
//         if(err) throw err;
//         console.log('deleted rows', result.affectedRows);
//     })
// })
// con.connect(function (err) {
//     if(err) throw err;
//     var sql ="update customers set address ='coimbatore' where address ='vellore'";
//     con.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err){
//     if(err) throw err;
//     con.query("select * from customers limit 4", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })
// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log('table created');
//     })
// })
// con.connect(function (err) {
//     if(err) throw err;
//     var sql = "insert into products (name) values ?";
//     var values = [
//         ['Dairy milk'],
//         ['kit kat'],
//         ['munch'],
//         ['milky bar'],
//         ['shots'],
//         ['snicker']
//     ]
//     con.query(sql,[values], (err, result) =>{
//         if(err) throw err;
//         console.log('row inserted :', result.affectedRows);
//     })
// });
// con.connect(function (err){
//     if (err) throw err;
//     var sql = "SELECT customers.id AS customerid,customers.name AS customersname, customers.address AS customeraddress, products.id AS productid, products.name AS productname FROM customers JOIN products ON customers.id = products.id";
//     con.query(sql , (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// })