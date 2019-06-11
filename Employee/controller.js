var db = require('./models.js');

const getEmployee = (req, res) => {
    // find method is used to select all documents from collection
    db.Employee.find({}, (err, employeeDt) => {
        if (err) {
            return err;
        }
        res.send(employeeDt);
    });
}
const getEmployeeById = (req, res) => {
    // This find method is used to select the particular id of the collection object
    var employee_id = req.params.employeeId;
    db.Employee.find({ employeeId: employee_id }, (err, employeeDt) => {
        if (err) {
            return err;
        }
        res.send(employeeDt);
    });
}
const postEmployee = (req, res) => {
    //Insert a document into a collection using create method.
    var update = {
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        employeeMobileNo: req.body.employeeMobileNo,
        employeeEmailId: req.body.employeeEmailId,
        projectManagerId: req.body.projectManagerId
    };
    db.Employee.create(update, (err, employeeDt) => {
        if (err) {
            return err;
        }
        res.send(employeeDt);
    })
}
const putEmployee = (req, res) => {
    // To update a document in a collection we use updateOne method
    var employee_id = req.params.employeeId;
    var update = {
        $set: {
            employeeName: req.body.employeeName,
            employeeMobileNo: req.body.employeeMobileNo,
            employeeEmailId: req.body.employeeEmailId,
            projectManagerId: req.body.projectManagerId
        }
    };
    db.Employee.updateOne({ employeeId: employee_id }, update, (err, employeeDt) => {
        if (err) {
            return err;
        }
        res.send(employeeDt);
    })
}
const delEmployee = (req, res) => {
    //To delete a document in a collection we use deleteOne method.
    var employee_id = req.params.employeeId;
    db.Employee.deleteOne({ employeeId: employee_id }, (err, employeeDt) => {
        if (err) {
            return err;
        }
        res.send(employeeDt);
    })
}
db.connect(() => {
})
module.exports = { getEmployee, getEmployeeById, postEmployee, putEmployee, delEmployee };