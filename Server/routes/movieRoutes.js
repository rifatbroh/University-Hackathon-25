// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getMovieSuggestion } = require('../controllers/movieController');

router.post('/suggest', getMovieSuggestion);

module.exports = router;
