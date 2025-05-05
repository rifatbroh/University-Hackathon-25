// routes/fashionRoutes.js
const express = require('express');
const router = express.Router();
const { getFashionTips } = require('../controllers/fashionController');

router.post('/tips', getFashionTips);

module.exports = router;
