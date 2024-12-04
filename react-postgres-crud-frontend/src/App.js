/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/



import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setError(""); // Clear error when toggling forms
  };

  return (
    <div className="App">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {isLogin ? (
        <Login setError={setError} />
      ) : (
        <Signup setError={setError} />
      )}
      {error && <p className="errorMessage">{error}</p>}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleForm}>
          {isLogin ? "Sign up here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default App;
