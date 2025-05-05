const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const cgpaRoutes = require('./routes/cgpa');
const semesterPlannerRoutes = require('./routes/semesterPlannerRoutes');
const subjectGoalRoutes = require('./routes/subjectGoalRoutes');
const skillRoutes = require('./routes/skillRoutes');
const jobRoutes = require('./routes/jobRoutes');
const appliedJobRoutes = require('./routes/appliedJobRoutes');
const resumeRoutes = require('./routes/resumeRoutes');


// DB connection.
dotenv.config();
// require('dotenv').config({ path: '/openai.env' });

connectDB();

// start the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cgpa', cgpaRoutes);
app.use('/api/semester-planner', semesterPlannerRoutes);
app.use('/api/subject-goals', subjectGoalRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applied-jobs', appliedJobRoutes);
app.use('/api/resume', resumeRoutes);


// Start the server.
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});