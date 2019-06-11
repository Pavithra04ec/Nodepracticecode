var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true},
  age: { type: Number, required: true},
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('student', studentSchema);