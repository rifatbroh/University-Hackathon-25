// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const { getResumeTips } = require('../controllers/resumeController');

router.post('/tips', getResumeTips);

module.exports = router;
