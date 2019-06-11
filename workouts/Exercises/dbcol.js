const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var dbo = require('./mongocon.js');
const port = 5000;
dbo.connect(() => {
})
app.get('/api/studentDetails', (req, res) => {
    dbo.getDb().collection("studentDetails").find({}).toArray((err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
})
app.get('/api/studentDetails/:id', (req, res) => {
    var std_id = parseInt(req.params.id);
    dbo.getDb().collection("studentDetails").find({ id: std_id }).toArray((err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
})

app.post('/api/studentDetails', (req, res) => {
    var insert = { id: req.body.id, name: req.body.name, age: req.body.age };
    dbo.getDb().collection("studentDetails").insertOne(insert, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
})

app.put('/api/studentDetails/:id', (req, res) => {
    var std_id = parseInt(req.params.id);
    var update = { $set: { name: req.body.name, age: req.body.age } }
    dbo.getDb().collection("studentDetails").updateOne({ id: std_id }, update, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
})

app.delete('/api/studentDetails/:id', (req, res) => {
    var std_id = parseInt(req.params.id)
    dbo.getDb().collection("studentDetails").deleteOne({ id: std_id }, (err, result) => {
        if (err) {
            return err;
        }
        res.json(result);
    })
})
app.listen(port, () => {
    console.log(`server connected ${port}`);
});