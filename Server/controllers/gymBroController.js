const axios = require('axios');
const GymBro = require('../models/GymBro');

exports.fetchAndStoreGymBros = async (req, res) => {
    try {
      const { lat, lon } = req.query;
  
      const response = await axios.get(`https://csefest.srejon.com/api/v1/gymbros?lat=${lat}&lon=${lon}`);
      
      console.log('Gymbros API Raw Response:', response.data);
  
      const gymBrosData = response.data;
  
      // 🔍 FIX: Check if response has a nested structure
      const gymBrosArray = Array.isArray(gymBrosData.data)
        ? gymBrosData.data
        : Array.isArray(gymBrosData)
        ? gymBrosData
        : [];
  
      if (gymBrosArray.length === 0) {
        return res.status(400).json({ message: 'Unexpected response format', data: gymBrosData });
      }
  
      // Prepare data for insertion
      const gymBrosToInsert = gymBrosArray.map(gymBro => ({
        id: gymBro.id?.toString() || '',
        name: gymBro.name || '',
        location: gymBro.location || '',
        lat: gymBro.lat || 0,
        lon: gymBro.lon || 0,
        address: gymBro.address || '',
        facilities: Array.isArray(gymBro.facilities) ? gymBro.facilities : [],
      }));
  
      const result = await GymBro.insertMany(gymBrosToInsert, { ordered: false });
  
      res.status(201).json({ message: 'Gymbros data stored successfully', insertedCount: result.length });
    } catch (error) {
      console.error('Error fetching and storing Gymbros data:', error);
      res.status(500).json({ message: 'Failed to fetch and store Gymbros data', error: error.message });
    }
};

exports.getAllGymBros = async (req, res) => {
    try {
      const gymBros = await GymBro.find().sort({ createdAt: -1 }); // sort by latest
      res.status(200).json(gymBros);
    } catch (error) {
      console.error('Error retrieving gymbros:', error);
      res.status(500).json({ message: 'Failed to retrieve gymbros', error: error.message });
    }
};
