var mongoose = require('mongoose');
//var student = mongoose.model('student', studentSchema);

var studentdt = {};

getDt = (req, res) => {
    dbo.getDb().collection("student").find({}).toArray((err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    });
}

getId = (req, res) => {
    var std_id = parseInt(req.params.id);
    dbo.getDb().collection("student").find({ id: std_id }).toArray((err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
};
postDt = (req, res) => {
    var insert = { id: req.body.id, name: req.body.name, age: req.body.age };
    studentdt.insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
        res.render("../views/student/index", {result: result});
        //res.json(result);
    })
}
putDt = (req, res) => {
    var std_id = parseInt(req.params.id);
    var update = { $set: { name: req.body.name, age: req.body.age } }
    dbo.getDb().collection("student").updateOne({ id: std_id }, update, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
deleteDt = (req, res) => {
    var std_id = parseInt(req.params.id)
    dbo.getDb().collection("student").deleteOne({ id: std_id }, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}

module.exports = {getDt, getId, postDt, putDt, deleteDt};