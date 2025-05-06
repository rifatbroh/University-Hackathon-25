import React, { useEffect, useState } from "react";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applied-jobs");
        if (!res.ok) throw new Error("Failed to fetch applied jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Error loading applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Applied Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No applied jobs found.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-indigo-800">
                {job.jobTitle} @ {job.company}
              </h3>
              <p className="text-gray-700 mt-1">
                <strong>Status:</strong> {job.status}
              </p>
              <p className="text-gray-700">
                <strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}
              </p>
              <p className="text-gray-600 italic mt-2">{job.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
