const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var projectSchema = new mongoose.Schema({
    //id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    MobileNo: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    ConfirmPassword: { type: String, required: true },
    Country: { type: String, required: true },
    Language: { type: String, required: true },
    //DOB: {type: Date, required: true}
    DOB: {type: String, required: true}
});
projectSchema.plugin(AutoIncrement, {inc_field: 'id'});
var user = mongoose.model('modelSchemas', projectSchema);
module.exports = { user };