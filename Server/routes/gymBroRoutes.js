const express = require('express');
const router = express.Router();
const gymBroController = require('../controllers/gymBroController');

router.post('/fetch-gymbros', gymBroController.fetchAndStoreGymBros);
router.get('/', gymBroController.getAllGymBros);

module.exports = router;
