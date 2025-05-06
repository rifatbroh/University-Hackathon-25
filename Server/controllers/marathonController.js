// controllers/marathonController.js
const axios = require('axios');
const Marathon = require('../models/Marathon');

exports.fetchAndStoreMarathons = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const { data } = await axios.get(`https://csefest.srejon.com/api/v1/marathon?lat=${lat}&lon=${lon}`);

    const inserted = [];

    for (const item of data?.data || []) {
      // Only insert if not already stored
      const exists = await Marathon.findOne({ id: item.id });
      if (!exists) {
        const marathon = new Marathon({
          id: item.id,
          name: item.name,
          location: item.location,
          date: item.date ? new Date(item.date) : null,
          description: item.description,
          lat: item.lat,
          lon: item.lon
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
      const marathons = await Marathon.find().sort({ date: 1 }); // upcoming first
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
      const { id, name, location, date, description, lat, lon } = req.body;
  
      // Create a new marathon entry
      const newMarathon = new Marathon({
        id,
        name,
        location,
        date,
        description,
        lat,
        lon,
      });
  
      // Save to the database
      await newMarathon.save();
  
      res.status(201).json({ message: 'Marathon added successfully', marathon: newMarathon });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add marathon', error: error.message });
    }
};
