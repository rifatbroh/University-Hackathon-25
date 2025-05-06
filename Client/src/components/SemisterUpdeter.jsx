import React, { useState } from "react";
import axios from "axios";

const CreateSubjectGoal = () => {
  // State to manage form data
  const [subjectName, setSubjectName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [targetGrade, setTargetGrade] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!subjectName || !goalDescription || !targetGrade || !deadline) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/subject-goals", {
        subjectName,
        goalDescription,
        targetGrade,
        deadline,
      });
      setLoading(false);
      alert("Goal created successfully!");
      // Optionally, reset form after submission
      setSubjectName("");
      setGoalDescription("");
      setTargetGrade("");
      setDeadline("");
    } catch (error) {
      setLoading(false);
      setError("There was an error creating the subject goal. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Subject Goal</h2>
     
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Subject Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="subjectName">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., Mathematics"
          />
        </div>

        {/* Goal Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="goalDescription">
            Goal Description
          </label>
          <textarea
            id="goalDescription"
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describe your goal"
          />
        </div>

        {/* Target Grade */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="targetGrade">
            Target Grade
          </label>
          <input
            type="text"
            id="targetGrade"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., A, B+"
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="deadline">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubjectGoal;
