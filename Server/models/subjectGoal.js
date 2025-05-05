const mongoose = require('mongoose');

const subjectGoalSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  targetGrade: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});

module.exports = mongoose.model('SubjectGoal', subjectGoalSchema);
