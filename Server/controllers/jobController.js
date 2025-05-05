const Job = require('../models/Job');

// Add mock jobs to database
exports.addMockJobs = async (req, res) => {
  try {
    const mockJobs = [
      {
        title: "Frontend Developer Intern",
        company: "TechVerse",
        location: "Remote",
        type: "Internship",
        description: "Build UI components using React.",
        applyLink: "https://example.com/apply/frontend",
        tags: ["React", "Internship", "Frontend"]
      },
      {
        title: "Backend Developer",
        company: "CloudNova",
        location: "Dhaka",
        type: "Full-time",
        description: "Node.js backend developer with MongoDB.",
        applyLink: "https://example.com/apply/backend",
        tags: ["Node.js", "MongoDB", "Backend"]
      }
    ];

    await Job.insertMany(mockJobs);
    res.status(201).json({ message: "Mock jobs added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add mock jobs.", error });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs.", error });
  }
};

// Search jobs
exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await Job.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { company: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }
      ]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to search jobs.", error });
  }
};
