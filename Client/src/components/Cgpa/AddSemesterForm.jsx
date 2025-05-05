import React, { useState } from "react";
import axios from "axios";

const AddSemesterForm = ({ onSuccess }) => {
  const [semester, setSemester] = useState("");
  const [gpa, setGpa] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/cgpa/", {
        semester,
        gpa: parseFloat(gpa),
      });

      setMessage("Semester added successfully!");
      setSemester("");
      setGpa("");
      if (onSuccess) onSuccess(); // optional callback to refresh data
    } catch (error) {
      console.error("Error adding semester:", error);
      setMessage("Failed to add semester. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">Add New Semester GPA</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Semester</label>
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Spring 2025"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GPA</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 3.85"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
    </form>
  );
};

export default AddSemesterForm;
