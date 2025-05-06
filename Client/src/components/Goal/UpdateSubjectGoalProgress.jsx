import React, { useEffect, useState } from "react";

const UpdateSubjectGoalProgress = ({ goalId, onUpdate }) => {
  const [goal, setGoal] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/subject-goals/${goalId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setGoal(data);
          setProgress(data.progress);
        } else {
          setMessage("Goal not found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error fetching goal.");
      });
  }, [goalId]);

  const handleProgressChange = (e) => {
    setProgress(parseInt(e.target.value));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/subject-goals/${goalId}/progress`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setGoal(updated);
        setMessage("Progress updated successfully.");
        setTimeout(() => onUpdate(), 1000);
      } else {
        const err = await res.json();
        setMessage(err.message || "Failed to update.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error.");
    }
  };

  if (!goal) {
    return <div className="text-center text-gray-600">{message || "Loading..."}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Update Progress for {goal.subjectName}
      </h2>
      <p className="mb-2 text-gray-700">
        <strong>Goal:</strong> {goal.goalDescription}
      </p>
      <p className="mb-2 text-gray-700">
        <strong>Target Grade:</strong> {goal.targetGrade}
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Deadline:</strong>{" "}
        {new Date(goal.deadline).toLocaleDateString()}
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Progress: {progress}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-full mb-4"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Update Progress
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default UpdateSubjectGoalProgress;
