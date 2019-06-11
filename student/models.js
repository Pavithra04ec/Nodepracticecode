var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dept: { type: String, required: true }
});
var studentDetails = mongoose.model('student', studentSchema);
module.exports = { studentDetails };