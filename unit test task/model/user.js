var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnect = () => {
  mongoose.set('useCreateIndex', true);
  //use connect method to connect the server
  mongoose.connect("mongodb://localhost:27017/prj_mng_db", { useNewUrlParser: true }, (err) => {
      console.log('db connected');
  });
}
//create schema 
const prjTbl = new Schema({
  projectId: { type: Number, required: true, unique: true },
  projectName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  projectDuration: { type: Number, required: true },
  totalProjectHours: { type: Number, required: true },
  projectManager: { type: String, required: true },
  projectDesc: { type: String, required: true }
});
const user = mongoose.model('prjmngtbl', prjTbl);
//exports the modules
module.exports = { dbConnect, user };