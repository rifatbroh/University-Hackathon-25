const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [String], // emails
  createdBy: { type: String, default: 'Hablu' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
