const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
    min: 0,
    max: 4.0,
  }
}, { _id: false });

const cgpaSchema = new mongoose.Schema({
  overallCgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 4.0,
  },
  history: [semesterSchema],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cgpa', cgpaSchema);
