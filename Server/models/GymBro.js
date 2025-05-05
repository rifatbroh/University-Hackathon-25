// models/GymBro.js
const mongoose = require('mongoose');

const gymBroSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  location: String,
  lat: Number,
  lon: Number,
  address: String,
  facilities: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GymBro', gymBroSchema);
