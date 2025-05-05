// controllers/appliedJobController.js
const AppliedJob = require('../models/AppliedJob');

// POST: Add new applied job
exports.addAppliedJob = async (req, res) => {
  try {
    const { jobTitle, company, status, dateApplied, notes } = req.body;
    const newJob = new AppliedJob({ jobTitle, company, status, dateApplied, notes });
    await newJob.save();
    res.status(201).json({ message: "Applied job saved successfully.", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Failed to save applied job.", error });
  }
};

// GET: List all applied jobs
exports.getAllAppliedJobs = async (req, res) => {
  try {
    const jobs = await AppliedJob.find().sort({ dateApplied: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applied jobs.", error });
  }
};

// PUT: Update status or notes
exports.updateAppliedJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const updatedJob = await AppliedJob.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Applied job not found." });
    }
    res.json({ message: "Job updated successfully.", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job.", error });
  }
};

// DELETE: Remove applied job
exports.deleteAppliedJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AppliedJob.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Job not found to delete." });
    }
    res.json({ message: "Job removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job.", error });
  }
};
