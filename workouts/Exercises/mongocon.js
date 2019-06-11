const MongoClient = require('mongodb').MongoClient;
const state = {
    db: null
};
const connect = (fn) => {
    MongoClient.connect("mongodb://localhost:27017/myDb", { useNewUrlParser: true }, function (err, db) {
        if (err) {
            return err;
        }
        state.db = db.db("myDb");
        fn();
        console.log("connected");
    });
}
const getDb = () => {
    return state.db;
}
module.exports = { getDb, connect };
