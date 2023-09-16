import React, { useState } from "react";
import { handleUserLogin } from "../../apicalls/auth";
import "./Login.css";
import Cookies from "js-cookie";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    const response = await handleUserLogin(formData);

    if (response.hasOwnProperty("access_token")) {
      Cookies.set("access_token", response.access_token);

      const expirationTime = new Date(Date.now() + 120 * 60 * 1000);
      Cookies.set("access_token", response.access_token, {
        expires: expirationTime,
      });

      if (response.role === 1) {
        window.location.href = "/jobs";
      } else {
        window.location.href = "/admin";
      }
    } else {
      setError(response.detail || "An error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-header">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <h4>{error}</h4>
      </div>
    </div>
  );
};

export default Login;
