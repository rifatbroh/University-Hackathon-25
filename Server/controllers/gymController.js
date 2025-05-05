const axios = require('axios');
const Gym = require('../models/Gym');

exports.fetchAndStoreGyms = async (req, res) => {
    try {
      const { lat, lon } = req.query;
  

      const response = await axios.get(`https://csefest.srejon.com/api/v1/gyms?lat=${lat}&lon=${lon}`);
      
    //   console.log('API Raw Response:', response.data); // Inspect structure here
  
      const gymsData = response.data.data || response.data; 
      if (!Array.isArray(gymsData)) {
        return res.status(400).json({ message: 'Unexpected response format', data: gymsData });
      }
  
      const gymsToInsert = gymsData.map(gym => ({
        id: gym.id?.toString() || '',
        name: gym.name || '',
        location: gym.location || '',
        lat: gym.lat || 0,
        lon: gym.lon || 0,
        address: gym.address || '',
        facilities: Array.isArray(gym.facilities) ? gym.facilities : [],
      }));
  
      const result = await Gym.insertMany(gymsToInsert);
      res.status(201).json({ message: 'Gyms data stored successfully', insertedCount: result.length });
  
    } catch (error) {
      console.error('Fetch and store error:', error);
      res.status(500).json({ message: 'Failed to fetch and store gyms data', error: error.message });
    }
};
  

exports.getGyms = async (req, res) => {
    try {
      const gyms = await Gym.find();
      res.json({ gyms });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch gyms data', error: error.message });
    }
};
