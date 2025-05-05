const SemesterPlanner = require('../models/semesterPlanner');

// Create a new semester planner
exports.createSemesterPlanner = async (req, res) => {
  try {
    const { semesterName, startDate, endDate } = req.body;
    const semesterPlanner = new SemesterPlanner({ semesterName, startDate, endDate });
    await semesterPlanner.save();
    res.status(201).json(semesterPlanner);
  } catch (error) {
    res.status(500).json({ message: 'Error creating semester planner', error });
  }
};

// Get all semester planners
exports.getAllSemesterPlanners = async (req, res) => {
  try {
    const planners = await SemesterPlanner.find();
    res.status(200).json(planners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching semester planners', error });
  }
};

// Get a specific semester planner by ID
exports.getSemesterPlannerById = async (req, res) => {
  try {
    const planner = await SemesterPlanner.findById(req.params.id);
    if (!planner) return res.status(404).json({ message: 'Planner not found' });
    res.status(200).json(planner);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching semester planner', error });
  }
};

// Add a task to a semester planner
exports.addTaskToPlanner = async (req, res) => {
  try {
    const { taskName, deadline } = req.body;
    const planner = await SemesterPlanner.findById(req.params.id);
    if (!planner) return res.status(404).json({ message: 'Planner not found' });
    planner.tasks.push({ taskName, deadline });
    await planner.save();
    res.status(201).json(planner);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task to planner', error });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const planner = await SemesterPlanner.findById(req.params.id);
    if (!planner) return res.status(404).json({ message: 'Planner not found' });

    const task = planner.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = req.body.completed;
    await planner.save();
    res.status(200).json(planner);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
};
