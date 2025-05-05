const SubjectGoal = require('../models/subjectGoal');

// Create a new subject goal
exports.createSubjectGoal = async (req, res) => {
  try {
    const { subjectName, goalDescription, targetGrade, deadline } = req.body;
    const subjectGoal = new SubjectGoal({ subjectName, goalDescription, targetGrade, deadline });
    await subjectGoal.save();
    res.status(201).json(subjectGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject goal', error });
  }
};

// Get all subject goals
exports.getAllSubjectGoals = async (req, res) => {
  try {
    const goals = await SubjectGoal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject goals', error });
  }
};

// Get a specific subject goal by ID
exports.getSubjectGoalById = async (req, res) => {
  try {
    const goal = await SubjectGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject goal', error });
  }
};

// Update subject goal progress
exports.updateSubjectGoalProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const goal = await SubjectGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    goal.progress = progress;
    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject goal progress', error });
  }
};
