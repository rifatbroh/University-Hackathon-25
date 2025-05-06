import { BarChart3, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const FocusAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/focus/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        🎯 Focus Analytics
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-100 rounded-xl flex items-center gap-4">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            <div>
              <p className="text-xl font-semibold">{analytics.totalSessions}</p>
              <p className="text-gray-700">Total Sessions</p>
            </div>
          </div>

          <div className="p-4 bg-green-100 rounded-xl flex items-center gap-4">
            <Clock className="text-green-600 w-8 h-8" />
            <div>
              <p className="text-xl font-semibold">
                {analytics.totalStudyTime} mins
              </p>
              <p className="text-gray-700">Total Study Time</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-100 rounded-xl flex items-center gap-4">
            <CheckCircle className="text-yellow-600 w-8 h-8" />
            <div>
              <p className="text-xl font-semibold">
                {analytics.completionRate}
              </p>
              <p className="text-gray-700">Completion Rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusAnalytics;
