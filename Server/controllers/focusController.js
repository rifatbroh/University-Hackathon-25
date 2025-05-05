const FocusSession = require("../models/focusSession");

// POST: Record a new focus session
exports.recordSession = async (req, res) => {
  try {
    const { duration, completed } = req.body;

    const session = new FocusSession({
      duration,
      completed
    });

    await session.save();
    res.status(201).json({ message: "Session recorded successfully", session });
  } catch (err) {
    res.status(500).json({ message: "Error saving session", error: err.message });
  }
};

// GET: Fetch analytics for Hablu
exports.getAnalytics = async (req, res) => {
  try {
    const sessions = await FocusSession.find({ user: "Hablu" });

    const totalSessions = sessions.length;
    const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const completedSessions = sessions.filter(s => s.completed).length;
    const completionRate = totalSessions === 0 ? 0 : (completedSessions / totalSessions * 100).toFixed(2);

    res.json({
      totalSessions,
      totalStudyTime,
      completionRate: `${completionRate}%`
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err.message });
  }
};
