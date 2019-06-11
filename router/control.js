var dbo = require('./dbconection.js');
const getDt = (req, res) => { 
    // find method is used to select all documents from collection.
    dbo.getDb().collection("stddt").find({}).toArray((err, result) => { 
        if (err) {
            return err;
        }
        res.json(result);
    });
}

const getId = (req, res) => {
    var std_id = parseInt(req.params.id); 
    // This find method is used to select the particular id of the collection object.
    dbo.getDb().collection("stddt").find({ id: std_id }).toArray((err, result) => { 
        if (err) {
            return err;
        }
        res.json(result);
    })
};
const postDt = (req, res) => {
    var insert = { id: parseInt(req.body.id), name: req.body.name, age: req.body.age };
    //console.log(insert);
    // To insert a document into a collection we use insertOne method.
    dbo.getDb().collection("stddt").insertOne(insert, (err, result) => { 
        if (err) {
            return err;
        }
       
        res.json(result);
    })
}
const putDt = (req, res) => {
    var std_id = parseInt(req.params.id);
    var update = { $set: { name: req.body.name, age: req.body.age } }
    //console.log(std_id + " "+ update);
    // To update a document in a collection we use updateOne method.
    dbo.getDb().collection("stddt").updateOne({ id: std_id }, update, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
const deleteDt = (req, res) => {
    var std_id = parseInt(req.params.id)
    //console.log(std_id);
    //To delete a document in a collection we use deleteOne method.
    dbo.getDb().collection("stddt").deleteOne({ id: std_id }, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
}
dbo.connect(() => {
})
module.exports = { getDt, getId, postDt, putDt, deleteDt };