import React, { useState } from "react";
import { useLocation } from "react-router";
import { handleUserSignup } from "../../apicalls/auth";
import "./Signup.css";

const Signup = () => {
  const location = useLocation();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: location.pathname === "/recruiter" ? 0 : 1,
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleUserSignup(userData);
    if (response) {
      setError("User Successfully Signed Up");
    } else {
      setError("Could not Sign up");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-header">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <h4>{error}</h4>
      </div>
    </div>
  );
};

export default Signup;
