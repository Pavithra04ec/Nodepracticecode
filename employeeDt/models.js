const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    EmpId: { type: Number,  unique: true },
    Name: { type: String},
    Role: { type: String, },
    PreOrganization: { type: String },
});

var user = mongoose.model('Emp_schema', Schema);
module.exports = { user };