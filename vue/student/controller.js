var dbo = require('../student/model');

const getDt = (req, res) => {
    dbo.getDb().collection("studentDetails").find({}).toArray((err, result) => {
        if (err) {
            return err;
        }
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(result);
    });
}

const getId = (req, res) => {
    var std_id = parseInt(req.params.id);
    dbo.getDb().collection("studentDetails").find({ id: std_id }).toArray((err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
};
const postDt = (req, res) => {
    var insert = { id: req.body.id, name: req.body.name, age: req.body.age };
    dbo.getDb().collection("studentDetails").insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
       
        res.json(result);
    })
}
const putDt = (req, res) => {
    var std_id = parseInt(req.params.id);
    var update = { $set: { name: req.body.name, age: req.body.age } }
    dbo.getDb().collection("studentDetails").updateOne({ id: std_id }, update, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
const deleteDt = (req, res) => {
    var std_id = parseInt(req.params.id)
    dbo.getDb().collection("studentDetails").deleteOne({ id: std_id }, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
dbo.connect(() => {
})
module.exports = { getDt, getId, postDt, putDt, deleteDt };