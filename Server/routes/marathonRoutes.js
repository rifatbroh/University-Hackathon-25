// routes/marathonRoutes.js
const express = require('express');
const router = express.Router();
const marathonController = require('../controllers/marathonController');

// Example: /api/marathon?lat=23.777176&lon=90.399452
router.get('/fetch', marathonController.fetchAndStoreMarathons);
router.get('/stored', marathonController.getStoredMarathons);
router.get('/upcoming', marathonController.getUpcomingMarathons);
router.post('/add', marathonController.addMarathon);

module.exports = router;
