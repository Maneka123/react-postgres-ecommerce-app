const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

// Database connection using environment variables for security
const pool = new Pool({
  user: process.env.DB_USER || "postgres",  // Make sure to use environment variables for sensitive data
  host: process.env.DB_HOST || "react-postgres-signup-backend-db-1",
  database: process.env.DB_NAME || "user",
  password: process.env.DB_PASSWORD || "12345678",
  port: process.env.DB_PORT || 5433,
});

pool.connect().then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

// Check if the user already exists
const userExists = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows.length > 0;
};

// Hash the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Create a new user
const createUser = async (email, password, username) => {
  const hashedPassword = await hashPassword(password);

  const result = await pool.query(
    "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
    [email, hashedPassword, username]
  );

  return result.rows[0];
};

// Verify user login credentials
const verifyUserCredentials = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) {
    return null; 
  }

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

module.exports = { userExists, createUser, verifyUserCredentials };
