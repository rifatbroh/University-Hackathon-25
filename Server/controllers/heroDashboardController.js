const Cgpa = require('../models/Cgpa');
const Skill = require('../models/Skill');
const AppliedJob = require('../models/AppliedJob');
const FocusSession = require('../models/focusSession');
const MoodEntry = require('../models/moodEntry');
const Schedule = require('../models/Schedule');

exports.getHeroDashboard = async (req, res) => {
  try {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours ahead

    const [cgpa, skills, appliedJobs, notAppliedJobs, sessions, moods, schedule, upcomingSession] = await Promise.all([
      Cgpa.findOne(), // assuming only 1 record for Hablu
      Skill.find(),
      AppliedJob.find({ status: { $ne: "Not Applied" } }),
      AppliedJob.find({ status: "Not Applied" }),
      FocusSession.find({ user: 'Hablu' }),
      MoodEntry.find({ user: 'Hablu' }).sort({ timestamp: -1 }).limit(7),
      Schedule.find({ createdBy: 'Hablu' }, '_id title startTime'),
      Schedule.findOne({
        createdBy: 'Hablu',
        startTime: { $gte: now, $lte: next24Hours }
      }).sort({ startTime: 1 }) // earliest in next 24h
    ]);

    const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const completedSessions = sessions.filter(s => s.completed).length;

    res.json({
      gpa: cgpa?.overallCgpa ?? null,
      skills: skills.map(s => s.interests).flat(),
      appliedJobsCount: appliedJobs.length,
      notAppliedJobsCount: notAppliedJobs.length,
      totalStudyTimeMinutes: totalStudyTime,
      completedSessions,
      recentMoodEntries: moods,
      schedule,
      upcomingSession: upcomingSession ? {
        id: upcomingSession._id,
        title: upcomingSession.title,
        startTime: upcomingSession.startTime
      } : null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load hero dashboard." });
  }
};
