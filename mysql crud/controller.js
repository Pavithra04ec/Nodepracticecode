var mysql = require('mysql');
//bcrypt allows you to hash and encrypt the sensitive data like user password before storing in the database.
//var bcrypt = require('bcryptjs');
//create connection, create a new connection to the database in mysql.
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});
con.connect(() => {
    console.log('db connected');
})
const postDt = (req, res) => {
    //call method will the stored procedure in this method.
    let sql = 'call employee_insert(?,?,?,?,?,?,?)';
    //hashSync is used to encrypt the data.
    const password = bcrypt.hashSync(req.body.password);
    con.query(sql,
        [req.body.id, req.body.name, req.body.mobileno, req.body.email, req.body.projectid, req.body.comments, password],
        (err, employeeDt) => {
            console.log(employeeDt)
            if (!employeeDt) {
                return res.status(404).send("This id is already in use.");
            }
            res.json(employeeDt);

        })
}
const getDt = (req, res) => {
    let sql = 'call employee_dt()';
    con.query(sql, (err, employeeDt) => {
        res.send(employeeDt);
    })
}
const getById = (req, res) => {
    //to check for property on an object is actually having or not.
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    let sql = 'call employee_id(?,?)'
    console.log(name);
    con.query(sql, [id, name], (err, employeeDt) => {
        //console.log(employeeDt);
        if (!employeeDt.length > 0) {
            return res.status(404).send("The given id and name is not found.");
        }
        res.send(employeeDt);
    })
}
const deleteDt = (req, res) => {
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    console.log(id, name)
    let sql = 'call employee_delete(?,?)';
    con.query(sql, [id, name], (err, employeeDt) => {
        if (employeeDt.affectedRows == 0) {
            return res.status(404).send("The given id is not found for delete request.");
        }
        res.send(employeeDt);
    })
}
const putDt = (req, res) => {
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    console.log(id, name)
    var sql = 'call put_sp(?,?,?,?,?,?,?)';
    if (id != 0) {
        //hashSync is used to encrypt the data.
        let password = bcrypt.hashSync(req.body.password);
        con.query(sql,
            [id, req.body.name, req.body.mobileno, req.body.email, req.body.projectid, req.body.comments, password],
            (err, employeeDt) => {
                //console.log(employeeDt);
                if (employeeDt.affectedRows == 0) {
                    return res.status(404).send("There was a problem updating the employee.");
                } else {
                    res.send(employeeDt);
                }
            });
    }
    else if (name != '') {
        let password = bcrypt.hashSync(req.body.password);
        con.query(sql,
            [req.body.id, name, req.body.mobileno, req.body.email, req.body.projectid, req.body.comments, password],
            (err, employeeDt) => {
                //console.log(employeeDt);
                if (employeeDt.affectedRows == 0) {
                    return res.status(404).send("There was a problem updating the employee.");
                } else {
                    res.send(employeeDt);
                }
            });
    }
}
module.exports = { postDt, getDt, getById, putDt, deleteDt };