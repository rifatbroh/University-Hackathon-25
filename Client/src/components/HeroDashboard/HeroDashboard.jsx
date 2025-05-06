import { motion } from "framer-motion";

import { Briefcase, CalendarDays, Clock, Link, Smile, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const HeroDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero-dashboard")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
        if (result.upcomingSession) {
          const timeLeft = new Date(result.upcomingSession.startTime).getTime() - new Date().getTime();
          setCountdown(Math.floor(timeLeft / 1000));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const secsLeft = secs % 60;
    return `${hrs}h ${mins}m ${secsLeft}s`;
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading dashboard...</p>;
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-2xl mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8 cursor-pointer">
        🦸‍♂️ Hero Dashboard
      </h1>

      {/* GPA & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 cursor-pointer">
        <motion.div className="bg-indigo-50 p-6 rounded-xl shadow flex flex-col gap-2">
          <TrendingUp className="text-indigo-500 w-6 h-6" />
          <h2 className="text-lg font-semibold">GPA</h2>
          <p className="text-2xl font-bold">{data.gpa}</p>
        </motion.div>

        <motion.div className="bg-green-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Jobs and Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 cursor-pointer">
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <Briefcase className="text-yellow-600 w-5 h-5" />
          <p><strong>Applied Jobs:</strong> {data.appliedJobsCount}</p>
          <p><strong>Not Applied:</strong> {data.notAppliedJobsCount}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <Clock className="text-blue-600 w-5 h-5" />
          <p><strong>Study Time:</strong> {data.totalStudyTimeMinutes} mins</p>
          <p><strong>Completed Sessions:</strong> {data.completedSessions}</p>
        </div>

        <div className="bg-pink-100 p-4 rounded-xl shadow">
          <Smile className="text-pink-600 w-5 h-5" />
          <p><strong>Recent Mood:</strong> {data.recentMoodEntries[0]?.mood}</p>
          <p className="text-xs text-gray-600">{data.recentMoodEntries[0]?.notes}</p>
        </div>
      </div>

      {/* Schedule */}
      <motion.div
        className="bg-gray-50 p-6 rounded-xl shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">📅 Upcoming Schedule</h2>
        <ul className="space-y-2 text-sm text-gray-800">
          {data.schedule.map((item) => (
            <motion.li
              key={item._id}
              className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span>{item.title}</span>
              <span className="text-gray-500 text-xs">{new Date(item.startTime).toLocaleString()}</span>
            </motion.li>
          ))}
        </ul>

        {data.upcomingSession && (
          <motion.div
            className="mt-6 p-4 bg-indigo-100 rounded-xl border-l-4 border-indigo-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="text-indigo-600 w-5 h-5" />
              <strong className="text-indigo-800">Next Session</strong>
            </div>
            <div className="text-gray-700 font-medium">
              {data.upcomingSession.title} - {new Date(data.upcomingSession.startTime).toLocaleString()}
            </div>
            <motion.div
              className="mt-2 text-sm text-indigo-700 font-semibold"
              animate={{ opacity: [0, 1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⏳ Starts in: {formatTime(countdown)}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HeroDashboard;
