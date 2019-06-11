var mongoClient = require('Mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongoClient.connect(url, function (err, db) {
    if (err) return 
    console.log('error');
        var dbo = db.db("myDb");
        console.log("connected");

    var arrayObj = [{ id: 1, name: "Pavi", age: 23, dept: "ECE" },
    { id: 2, name: "Chinnu", age: 22, dept: "CSE" },
    { id: 3, name: "Ammu", age: 21, dept: "IT" },
    { id: 4, name: "Arul", age: 25, dept: "Mech" },
    { id: 5, name: "Ramya", age: 24, dept: "EEE" },
    { id: 6, name: "Rani", age: 20, dept: "Civil" },
    { id: 7, name: "Raji", age: 19, dept: "Aero" },
    { id: 8, name: "Ravi", age: 24, dept: "Mech" },
    { id: 9, name: "Paru", age: 26, dept: "ECE" },
    { id: 10, name: "Viji", age: 25, dept: "CSE" },
    { id: 11, name: "Priya", age: 22, dept: "Civil" },
    { id: 12, name: "Ram", age: 20, dept: "IT" },]

    dbo.collections("studentDetails").insertMany(arrayObj, function (err, res){
        if (err) throw error;
        console.log("Number of details inserted"+ re.inserted(count));


    })



})