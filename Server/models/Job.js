// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,  // City, State, Country, Remote, etc.
  type: String, // Full-time, Part-time, Remote, etc.
  description: String,
  applyLink: String,
  tags: [String],
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
