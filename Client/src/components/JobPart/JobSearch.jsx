import React, { useState } from "react";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Search Jobs</h2>

      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tech, or location..."
          className="flex-grow border border-gray-300 p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="p-5 bg-white rounded-xl shadow border border-gray-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              {job.title} - <span className="text-gray-700 font-medium">{job.company}</span>
            </h3>
            <p className="text-gray-600 mb-1">Location: {job.location}</p>
            <p className="text-gray-600 mb-2">Type: {job.type}</p>
            <p className="text-gray-700 mb-2">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.tags.map((tag, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
