import React, { useEffect, useState } from "react";
import UpdateSubjectGoalProgress from "./UpdateSubjectGoalProgress";

const SubjectGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const fetchGoals = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/subject-goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleUpdateClick = (goal) => {
    setSelectedGoalId(goal._id);
  };

  const closeUpdatePopup = () => {
    setSelectedGoalId(null);
    fetchGoals(); // Refresh list after update
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">Subject Goals</h2>
      <div className="grid gap-6">
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {goal.subjectName}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Goal:</span> {goal.goalDescription}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Target Grade:</span> {goal.targetGrade}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(goal.deadline).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress: {goal.progress}%
              </label>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => handleUpdateClick(goal)}
              className="mt-4 text-sm text-indigo-600 hover:underline"
            >
              Update Progress
            </button>
          </div>
        ))}
      </div>

      {/* Update Popup */}
      {selectedGoalId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={closeUpdatePopup}
            >
              &times;
            </button>
            <UpdateSubjectGoalProgress
              goalId={selectedGoalId}
              onUpdate={closeUpdatePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectGoals;
