const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var studentDetails = [{ id: 1, name: "pavi", age: 22 },
{ id: 2, name: "arul", age: 25 },
{ id: 3, name: "ramya", age: 24 },
{ id: 4, name: "mona", age: 21 },
{ id: 5, name: "paru", age: 23 },
{ id: 6, name: "viji", age: 22 }]

app.get('/', (req, res) => {
    res.send("hello !!!");
});

app.get('/api/studentDetails', (req, res) => {
    res.json(studentDetails);
});

app.get('/api/studentDetails/:id', (req, res) => {
    const details = studentDetails.find(std_id => std_id.id === parseInt(req.params.id));
    if (!details) res.status(404).send("the id is not found");
    res.json(details);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

app.post('/api/studentDetails', (req, res) => {
    if (req.body.name.length < 2) {
        res.status(404).send("name should have more than 2 characters");
    }
    const details = { id: req.body.id, name: req.body.name, age: req.body.age }
    const detail = studentDetails.push(details);
    res.json(detail);
});

app.put('/api/studentDetails/:id', (req, res) => {
    var details = studentDetails.find(std_id => std_id.id === parseInt(req.params.id));
    if (req.body.name.length < 2) {
        res.status(404).send("name should have more than 2 characters");
    }
    details.name = req.body.name;
    res.send(details);
});

app.delete("/api/studentDetails/:id", (req, res) => {
    const details = studentDetails.find(std_id => std_id.id === parseInt(req.params.id));
    if (!details) {
        res.status(404).send("details is not found");
    }
    const index = studentDetails.indexOf(details);
    studentDetails.splice(index, 1);
    res.send(details);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server connected ${port}`);
});