const express = require('express');
const router = express.Router();
const semesterPlannerController = require('../controllers/semesterPlannerController');

// Create a new semester planner
router.post('/', semesterPlannerController.createSemesterPlanner);

// Get all semester planners
router.get('/', semesterPlannerController.getAllSemesterPlanners);

// Get a specific semester planner
router.get('/:id', semesterPlannerController.getSemesterPlannerById);

// Add a task to a semester planner
router.post('/:id/tasks', semesterPlannerController.addTaskToPlanner);

// Update a task status
router.put('/:id/tasks/:taskId', semesterPlannerController.updateTaskStatus);

module.exports = router;
