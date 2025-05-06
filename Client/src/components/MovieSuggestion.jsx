import React, { useState } from "react";

const MovieSuggestion = () => {
  const [formData, setFormData] = useState({
    mood: "",
    genre: "Drama",
    duration: "90-120 mins",
  });

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuggestion("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/movies/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to fetch movie suggestion.");
      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (err) {
      console.error(err);
      setError("Failed to get movie suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-4xl text-center font-bold text-black mb-4">Movie Suggestion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Mood</label>
          <input
            type="text"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
            placeholder="e.g., happy, emotional, adventurous"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          >
            <option>Drama</option>
            <option>Comedy</option>
            <option>Action</option>
            <option>Thriller</option>
            <option>Romance</option>
            <option>Horror</option>
            <option>Sci-Fi</option>
            <option>Documentary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          >
            <option>Less than 90 mins</option>
            <option>90-120 mins</option>
            <option>Over 120 mins</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Generating..." : "Get Suggestion"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {suggestion && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md text-gray-800">
          <strong>Suggestion:</strong> {suggestion}
        </div>
      )}
    </div>
  );
};

export default MovieSuggestion;
