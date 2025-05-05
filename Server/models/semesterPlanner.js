const mongoose = require('mongoose');

const semesterPlannerSchema = new mongoose.Schema({
  semesterName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      taskName: {
        type: String,
        required: true,
      },
      deadline: {
        type: Date,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }
  ],
});

module.exports = mongoose.model('SemesterPlanner', semesterPlannerSchema);
