const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
// DB connection.
dotenv.config();
connectDB();

// start the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Start the server.
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});