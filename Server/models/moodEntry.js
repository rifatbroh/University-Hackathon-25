const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  notes: {
    type: String
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

module.exports = mongoose.models.MoodEntry || mongoose.model('MoodEntry', moodEntrySchema);
