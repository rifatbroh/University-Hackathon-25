const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  rank: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  category: { type: String, required: true },
  nationality: { type: String, required: true }
});

const routeSchema = new mongoose.Schema({
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  checkpoints: [{ type: String }]
});

const marathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  distance: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  participants: [participantSchema],
  registrationFee: { type: Number, required: true },
  prizeMoney: { type: Number, required: true },
  registrationDeadline: { type: Date, required: true },
  categories: [{ type: String }],
  facilities: [{ type: String }],
  route: routeSchema
});

const Marathon = mongoose.model('Marathon', marathonSchema);

module.exports = Marathon;
