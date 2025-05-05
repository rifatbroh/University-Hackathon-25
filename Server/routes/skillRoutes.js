const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/interests', skillController.saveInterests);
router.get('/suggestions', skillController.getSuggestions);
router.get('/daily-tip', skillController.getDailySkillTip);


module.exports = router;
