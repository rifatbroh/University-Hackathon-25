import React, { useState } from "react";

const SaveInterests = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest(""); // Clear input field
    }
  };

  const handleSubmit = async () => {
    if (interests.length === 0) {
      setMessage("Please add at least one interest.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("http://localhost:5000/api/skills/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interests }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setInterests([]); // Clear the list after successful submission
      } else {
        setMessage(data.message || "Failed to save interests.");
      }
    } catch (error) {
      console.error("Error saving interests:", error);
      setMessage("An error occurred while saving your interests.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Save Your Interests</h2>

      {/* Interest Input */}
      <div className="mb-4">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Add a new interest"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddInterest}
          className="mt-2 text-sm text-indigo-600 hover:underline"
        >
          Add Interest
        </button>
      </div>

      {/* List of Added Interests */}
      <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-indigo-600 text-white py-2 rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
        }`}
      >
        {loading ? "Saving..." : "Save Interests"}
      </button>

      {/* Feedback Message */}
      {message && (
        <p className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SaveInterests;
