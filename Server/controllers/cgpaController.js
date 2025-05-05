const Cgpa = require('../models/Cgpa');

// Get CGPA
exports.getCgpa = async (req, res) => {
  try {
    const cgpa = await Cgpa.findOne();
    res.json(cgpa || {});
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Set or Update CGPA
exports.setOrUpdateCgpa = async (req, res) => {
  try {
    const { overallCgpa } = req.body;
    let cgpa = await Cgpa.findOne();

    if (cgpa) {
      cgpa.overallCgpa = overallCgpa;
      cgpa.lastUpdated = Date.now();
      await cgpa.save();
    } else {
      cgpa = new Cgpa({ overallCgpa });
      await cgpa.save();
    }

    res.status(200).json(cgpa);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set CGPA' });
  }
};

// Get CGPA History
exports.getHistory = async (req, res) => {
  try {
    const cgpa = await Cgpa.findOne();
    if (!cgpa) return res.status(404).json({ error: 'CGPA not found' });

    res.json(cgpa.history);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add Semester GPA
exports.addSemesterGpa = async (req, res) => {
  try {
    const { semester, gpa } = req.body;
    const cgpa = await Cgpa.findOne();

    if (!cgpa) return res.status(404).json({ error: 'CGPA not initialized' });

    cgpa.history.push({ semester, gpa });
    await cgpa.save();
    res.status(201).json(cgpa.history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add semester GPA' });
  }
};
