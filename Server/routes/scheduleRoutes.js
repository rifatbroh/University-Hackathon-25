const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController');

// Mock user auth middleware
router.use((req, res, next) => {
  req.user = { username: 'Hablu' }; // simulate login
  next();
});

router.post('/', controller.createSchedule);
router.get('/', controller.getAllSchedules);
router.put('/:id', controller.updateSchedule);
router.delete('/:id', controller.deleteSchedule);

module.exports = router;
