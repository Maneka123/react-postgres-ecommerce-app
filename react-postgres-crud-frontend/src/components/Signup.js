import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css";  // Import the CSS file for signup styling
import signupImage from "../assets/signup.jpg";  // Import the signup image

const Signup = ({ setError }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4002/api/signup", {
        email,
        username,
        password
      });

      if (response.status === 201) {
        alert("Signup successful!");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div>
      <img src={signupImage} alt="Signup" className="signupImage" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="inputField"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="inputField"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="inputField"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="inputField"
        />
        <button type="submit" className="submitButton">Sign Up</button>
      </form>

      <div className="termsLink">
        <a href="#" role="button" onClick={() => setShowTerms(true)}>Terms and Conditions</a>
        {showTerms && (
          <div className="popup">
            <p>Terms and Conditions...</p>
            <button onClick={() => setShowTerms(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
