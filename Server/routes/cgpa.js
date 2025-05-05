const express = require('express');
const router = express.Router();
const cgpaController = require('../controllers/cgpaController.js');

// GET overall CGPA
router.get('/', cgpaController.getCgpa);

// POST or PUT overall CGPA
router.post('/', cgpaController.setOrUpdateCgpa);
router.put('/', cgpaController.setOrUpdateCgpa);

// GET semester history
router.get('/history', cgpaController.getHistory);

// POST semester GPA
router.post('/history', cgpaController.addSemesterGpa);

module.exports = router;
