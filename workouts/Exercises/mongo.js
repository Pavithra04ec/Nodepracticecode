const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const port = 3000;

const mongo_uri = 'mongodb://localhost:32768';

app.get('/', (req, res) => {
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
  .then(client => {
    const db = client.db('my-db');
    const collection = db.collection('my-collection');
    collection.find({}).toArray().then(response => res.status(200).json(response)).catch(error => console.error(error));
  });
});

app.get('/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
  .then(client => {
    const db = client.db('my-db');
    const collection = db.collection('my-collection');
    collection.findOne({ _id: id }).then(response => res.status(200).json(response)).catch(error => console.error(error));
  });
});

app.listen(port, () => console.info(`REST API running on port ${port}`));