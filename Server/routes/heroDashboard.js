const express = require('express');
const router = express.Router();
const { getHeroDashboard } = require('../controllers/heroDashboardController');

router.get('/', getHeroDashboard);

module.exports = router;
