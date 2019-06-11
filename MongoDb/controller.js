var dbo = require('./Mongo');
var date = new Date;
const postDt = (req, res) => {
    var insert = {
        employeeId : req.body.employeeId,
        employeeName: req.body.employeeName, 
        age: req.body.age,
        project : req.body.project,
        date : date
    };
    dbo.getDb().collection("employeeDetail").insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
       
        res.json(result);
    })
}
const postDt1 = (req, res) => {
    var insert = {
        managerId : req.body.managerId,
        managerName: req.body.managerName, 
        project : req.body.project
    };
    dbo.getDb().collection("managerDetail").insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
       
        res.json(result);
    })
}
const postDt2 = (req, res) => {
    var insert = {
        zipcode : req.body.zipcode,
        city : req.body.city,
        state : req.body.state,
        pop : req.body.pop,
        loc : req.body.loc
    };
    dbo.getDb().collection("address").insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
       
        res.json(result);
    })
}
dbo.connect(() => {
})
module.exports = {postDt,postDt1,postDt2};