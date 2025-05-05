import React, { useEffect, useState } from "react";
import axios from "axios";

const CgpaCard = ({ refresh }) => {
  const [cgpaData, setCgpaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // start loading on refresh
    axios
      .get("http://localhost:5000/api/cgpa/")
      .then((response) => {
        setCgpaData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CGPA data:", error);
        setLoading(false);
      });
  }, [refresh]); // run on mount and when `refresh` changes

  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-4 mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">CGPA Overview</h2>
        <p className="text-gray-600 text-sm">
          Last Updated: {new Date(cgpaData.lastUpdated).toLocaleString()}
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800">Overall CGPA</h3>
        <p className="text-xl font-bold text-blue-600">{cgpaData.overallCgpa.toFixed(2)}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">Semester History</h3>
        <ul className="divide-y divide-gray-200 mt-2">
          {cgpaData.history
            .sort((a, b) => a.semester.localeCompare(b.semester))
            .map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span className="text-gray-700">{item.semester}</span>
                <span className="font-medium text-gray-900">{item.gpa.toFixed(2)}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CgpaCard;
