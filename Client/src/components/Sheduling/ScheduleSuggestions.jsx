import { useEffect, useState } from "react";

const ScheduleSuggestions = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedule");
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📅 Schedule Suggestions</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : schedules.length === 0 ? (
        <p className="text-center">No schedules available.</p>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <div key={schedule._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold">{schedule.title}</h3>
              <p className="text-gray-600">{schedule.description}</p>
              <p className="mt-2">
                🕒 <strong>Start:</strong> {formatTime(schedule.startTime)}<br />
                🕓 <strong>End:</strong> {formatTime(schedule.endTime)}
              </p>
              <p className="mt-2">
                👥 <strong>Participants:</strong> {schedule.participants.join(", ")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created by: <strong>{schedule.createdBy}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleSuggestions;
