// models/Marathon.js
const mongoose = require('mongoose');

const marathonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  location: String,
  date: Date,
  description: String,
  lat: Number,
  lon: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Marathon', marathonSchema);
