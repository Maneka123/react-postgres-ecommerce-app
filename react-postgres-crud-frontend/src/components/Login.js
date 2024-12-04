import React, { useState } from "react";
import axios from "axios";
import '../styles/login.css';  // Import the CSS file for login styling

const Login = ({ setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4002/api/login", {
        email,
        password
      });

      if (response.status === 200) {
        alert("Login successful!");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="inputField"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="inputField"
      />
      <button type="submit" className="submitButton">Login</button>
    </form>
  );
};

export default Login;
