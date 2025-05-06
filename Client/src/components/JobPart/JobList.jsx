import React, { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch jobs from the API
    fetch("http://localhost:5000/api/jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job listings.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Listings</h2>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {job.title} - <span className="font-medium text-gray-700">{job.company}</span>
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Type:</span> {job.type}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Description:</span> {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
