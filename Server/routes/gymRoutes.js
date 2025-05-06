const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');


router.post('/fetch-and-store', gymController.fetchAndStoreGyms);
router.get('/get-gyms', gymController.getGyms);

module.exports = router;
