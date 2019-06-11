const mongoose = require('mongoose');
//This file create a database and connect to mongodb server runnig on port : 27017.
const connect = () => {
    mongoose.connect("mongodb://localhost:27017/EmployeeDb", { useNewUrlParser: true }, function (err, db) {
        if (err) {
            return err;
        }
        console.log("connected");
    });
}
// we will create our model.
var employeeSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true, unique: true },
    employeeName: { type: String, required: true},
    employeeMobileNo: { type: Number, required: true},
    employeeEmailId: { type: String, required: true},
    projectManagerId: { type: Number, required: true },
});

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = { connect, Employee }

