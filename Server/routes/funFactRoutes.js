const express = require('express');
const router = express.Router();
const funFactController = require('../controllers/funFactController');

router.get('/', funFactController.getFunFact);

module.exports = router;
