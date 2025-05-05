const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  location: String,
  lat: Number,
  lon: Number,
  address: String,
  facilities: [String], // An array of gym facilities
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gym', gymSchema);
