import React, { useState } from "react";

const ResumeTips = () => {
  const [careerGoal, setCareerGoal] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry-level");
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTips("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/resume/tips/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerGoal, experienceLevel }),
      });

      if (!res.ok) throw new Error("Failed to fetch resume tips.");

      const data = await res.json();
      setTips(data.tips);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Get Resume Tips</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Career Goal</label>
          <input
            type="text"
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
          >
            <option>Entry-level</option>
            <option>Mid-level</option>
            <option>Senior-level</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Generating..." : "Get Tips"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {tips && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-md font-semibold mb-2">Resume Tips:</h3>
          <pre className="whitespace-pre-wrap text-gray-700">{tips}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeTips;
