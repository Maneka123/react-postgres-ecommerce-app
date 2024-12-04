const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');  // For environment variables
const authRoutes = require('./routes/authRoutes');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
