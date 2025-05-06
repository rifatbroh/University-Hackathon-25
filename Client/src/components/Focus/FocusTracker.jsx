import { useEffect, useState } from "react";

const FocusTracker = () => {
  const [duration, setDuration] = useState("");
  const [completed, setCompleted] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch analytics on load
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/focus/record"); // adjust if needed
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      duration: Number(duration),
      completed
    };

    try {
      const res = await fetch("http://localhost:5000/api/focus/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Session recorded successfully!");
        setDuration("");
        setCompleted(false);
        fetchAnalytics();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Failed to record session");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Focus Session Tracker</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration in minutes"
          className="w-full p-2 border rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span>Completed this session?</span>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Session
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}

      {analytics && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">📊 Your Focus Analytics</h3>
          <p><strong>Total Sessions:</strong> {analytics.totalSessions}</p>
          <p><strong>Total Study Time:</strong> {analytics.totalStudyTime} minutes</p>
          <p><strong>Completion Rate:</strong> {analytics.completionRate}</p>
        </div>
      )}
    </div>
  );
};

export default FocusTracker;
