const axios = require('axios');
const bcrypt = require("bcryptjs");
const { userExists, createUser, verifyUserCredentials } = require('../models/userModel');

// Signup controller
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await userExists(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await createUser(email, password, username);

    try {
      const response = await axios.post("https://external-api.com/send-welcome-email", {
        email: newUser.email,
        username: newUser.username
      });

      if (response.status === 200) {
        console.log("Welcome email sent!");
      } else {
        console.log("Failed to send welcome email");
      }
    } catch (err) {
      console.error("Error sending welcome email:", err);
    }

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "An error occurred during signup." });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await verifyUserCredentials(email, password);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

module.exports = { signup, login };
