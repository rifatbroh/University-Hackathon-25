import React, { useEffect, useState } from 'react';

const SemesterPlanner = () => {
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/semester-planner')
      .then((res) => res.json())
      .then((data) => {
        setSemester(data[0]); // Assuming only one semester for now
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!semester) {
    return <div className="text-center mt-10 text-red-500">No data available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">{semester.semesterName}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Start Date:</span>{' '}
        {new Date(semester.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">End Date:</span>{' '}
        {new Date(semester.endDate).toLocaleDateString()}
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">Tasks</h2>
      <ul className="space-y-2">
        {semester.tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-xl"
          >
            <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
              {task.taskName}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SemesterPlanner;
