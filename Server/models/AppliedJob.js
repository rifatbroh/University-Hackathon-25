const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offer", "Rejected"],
    default: "Applied"
  },
  dateApplied: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model('AppliedJob', appliedJobSchema);
