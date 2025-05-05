// controllers/marathonController.js
const axios = require('axios');
const Marathon = require('../models/Marathon');

exports.fetchAndStoreMarathons = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const { data } = await axios.get(`https://csefest.srejon.com/api/v1/marathon?lat=${lat}&lon=${lon}`);
    const inserted = [];

    for (const item of data?.data || []) {
      const exists = await Marathon.findOne({ id: item.id });
      if (!exists) {
        const marathon = new Marathon({
          id: item.id,
          name: item.name,
          date: item.date ? new Date(item.date) : null,
          location: item.location,
          distance: item.distance,
          coordinates: {
            lat: item.coordinates?.lat || item.lat,
            lon: item.coordinates?.lon || item.lon,
          },
          participants: item.participants || [],
          registrationFee: item.registrationFee,
          prizeMoney: item.prizeMoney,
          registrationDeadline: item.registrationDeadline ? new Date(item.registrationDeadline) : null,
          categories: item.categories || [],
          facilities: item.facilities || [],
          route: {
            startPoint: item.route?.startPoint,
            endPoint: item.route?.endPoint,
            checkpoints: item.route?.checkpoints || []
          }
        });

        await marathon.save();
        inserted.push(marathon);
      }
    }

    res.json({ message: "Marathon data stored successfully", insertedCount: inserted.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch/store marathon data" });
  }
};

exports.getStoredMarathons = async (req, res) => {
  try {
    const marathons = await Marathon.find().sort({ date: 1 });
    res.json(marathons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch marathons" });
  }
};

exports.getUpcomingMarathons = async (req, res) => {
  try {
    const now = new Date();
    const upcoming = await Marathon.find({ date: { $gt: now } }).sort({ date: 1 });
    res.json(upcoming);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch upcoming marathons" });
  }
};

exports.addMarathon = async (req, res) => {
  try {
    const {
      id,
      name,
      date,
      location,
      distance,
      coordinates,
      participants,
      registrationFee,
      prizeMoney,
      registrationDeadline,
      categories,
      facilities,
      route
    } = req.body;

    const newMarathon = new Marathon({
      id,
      name,
      date: date ? new Date(date) : null,
      location,
      distance,
      coordinates,
      participants: participants || [],
      registrationFee,
      prizeMoney,
      registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
      categories,
      facilities,
      route
    });

    await newMarathon.save();

    res.status(201).json({ message: 'Marathon added successfully', marathon: newMarathon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add marathon', error: error.message });
  }
};
