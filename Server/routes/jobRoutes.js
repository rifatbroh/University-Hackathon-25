const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/mock', jobController.addMockJobs); // insert mock data
router.get('/', jobController.getAllJobs);       // get all jobs
router.get('/search', jobController.searchJobs); // search by keyword

module.exports = router;
