const express = require('express');
const router = express.Router();
const subjectGoalController = require('../controllers/subjectGoalController');

// Create a new subject goal
router.post('/', subjectGoalController.createSubjectGoal);

// Get all subject goals
router.get('/', subjectGoalController.getAllSubjectGoals);

// Get a specific subject goal
router.get('/:id', subjectGoalController.getSubjectGoalById);

// Update progress for a subject goal
router.put('/:id', subjectGoalController.updateSubjectGoalProgress);

module.exports = router;
