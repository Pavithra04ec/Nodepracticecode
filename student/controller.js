//var dbo = require('./db');
var dbo = require('./models')

const getDt = (req, res) => {
    dbo.studentDetails.find({},(err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    });
}

const getId = (req, res) => {
    var std_id = parseInt(req.params.id);
    dbo.studentDetails.find({ id: std_id },(err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
};
const postDt = (req, res) => {
    var insert = { id: req.body.id, name: req.body.name, age: req.body.age, dept:req.body.dept };
    console.log(insert);
    dbo.studentDetails.create(insert, (err, result) => {
        if (err) {
            return err;
        }
       res.json(result);
        //console.log(result);
    })
}
const putDt = (req, res) => {
    var std_id = parseInt(req.params.id);
    var update = { $set: { name: req.body.name, age: req.body.age, dept:req.body.dept } }
    dbo.studentDetails.updateOne({ id: std_id }, update, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
const deleteDt = (req, res) => {
    var std_id = parseInt(req.params.id)
    dbo.studentDetails.deleteOne({ id: std_id }, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
module.exports = { getDt, getId, postDt, putDt, deleteDt };