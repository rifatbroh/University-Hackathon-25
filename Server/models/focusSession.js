const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema({
  duration: {
    type: Number, // in minutes
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: "Hablu"
  }
});

module.exports = mongoose.models.FocusSession || mongoose.model('FocusSession', focusSessionSchema);
