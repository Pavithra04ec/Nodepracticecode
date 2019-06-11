var MongoClient = require('Mongodb').MongoClient;
var readLine = require('readline-sync')
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log('error');
        return;
    }
    console.log("connected");
    var dbo = db.db("myDb");
    

    var arrayObj = [{ id: 1, name: "Pavi", age: 23, dept: "ECE" },
    { id: 2, name: "Chinnu", age: 22, dept: "CSE" },
    { id: 3, name: "Ammu", age: 21, dept: "IT" },
    { id: 4, name: "Ani", age: 25, dept: "Mech" },
    { id: 5, name: "Ramya", age: 24, dept: "EEE" },
    { id: 6, name: "Rani", age: 20, dept: "Civil" },
    { id: 7, name: "Raji", age: 19, dept: "Aero" },
    { id: 8, name: "Ravi", age: 24, dept: "Mech" },
    { id: 9, name: "Paru", age: 26, dept: "ECE" },
    { id: 10, name: "Viji", age: 25, dept: "CSE" },
    { id: 11, name: "Priya", age: 22, dept: "Civil" },
    { id: 12, name: "Ram", age: 20, dept: "IT" }];

    var operation = readLine.question("enter the operation ");

    switch (operation) {

        case "insert":
            dbo.collection("studentDetails").insertMany(arrayObj, function (err, res) {
                if (err) {
                    return err;
                }
                console.log(res);
            });
            break;

        case "find":
            dbo.collection("studentDetails").find({}).toArray(function (err, res) {
                if (err) {
                    return err;
                }
                console.log(res);
            });
            break;

        case "findsome":
            dbo.collection("studentDetails").find({}, { projection: { _id: 0, name: 1, dept: 1 } }).toArray(function (err, res) {
                if (err) {
                    return err;
                }
                console.log(res);
            });
            break;

        case "findone":
            var id = readLine.question("enter the id to get ");
           
                dbo.collection("studentDetails").findOne({}, function (err, res) {
                    if (err) {
                        return err;
                    }
                    console.log(res);
                });
            
            break;

        case "update":
            var myValue = { id: 4 };
            var newValue = { $set: { name: "ajith", age: 20 } };

            dbo.collection("studentDetails").updateOne(myValue, newValue, () => {
                if (err) {
                    return err;
                }
                console.log("updated");
            });
            break;

        case "delete":
            var myValue = { name: "Ammu" };
            dbo.collection("studentDetails").deleteOne(myValue, () => {
                if (err) {
                    return err;
                }
                console.log("deleted");
            });
            break;

        case "drop":

            dbo.collection("studentDetails").drop(function (err, res) {
                if (err) {
                    return err;
                }
                console.log("droped");
            });
            break;
    }
})






