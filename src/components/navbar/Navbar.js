import Cookies from "js-cookie";
import React from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let userid = null;
  let role = null;
  const token = Cookies.get("access_token");
  if (token !== undefined) {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    userid = payload.sub;
    role = payload.role;
  }

  const removeCookie = () => {
    Cookies.remove("access_token");
  };

  return (
    <div>
      {Cookies.get("access_token") ? (
        <div>
          {role === 1 ? (
            <nav className="navbar">
              <ul className="navbar-list">
                <li>
                  <a href="/jobs" className="navbar-link recruiter-link">
                    Jobs
                  </a>
                </li>
                <li>
                  <a
                    href={`/profile/${userid}`}
                    className="navbar-link login-link"
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href={`/applications/${userid}`}
                    className="navbar-link recruiter-link"
                  >
                    My Applications
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={removeCookie}
                    className="navbar-link login-link"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="navbar">
              <ul className="navbar-list">
                <li>
                  <a href="/admin" className="navbar-link recruiter-link">
                    Manage Jobs
                  </a>
                </li>
                <li>
                  <a href="/post-job" className="navbar-link login-link">
                    Post Job
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={removeCookie}
                    className="navbar-link recruiter-link"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      ) : (
        <nav className="navbar">
          <ul className="navbar-list">
            {location.pathname === "/" || location.pathname === "/recruiter" ? (
              <li>
                <a href="/login" className="navbar-link login-link">
                  Already Registered? Login here
                </a>
              </li>
            ) : (
              <li>
                <a href="/" className="navbar-link login-link">
                  Signup as Jobseeker
                </a>
              </li>
            )}
            {location.pathname === "/recruiter" ? (
              <li>
                <a href="/" className="navbar-link recruiter-link">
                  Signup as Jobseeker
                </a>
              </li>
            ) : (
              <li>
                <a href="/recruiter" className="navbar-link recruiter-link">
                  Signup as Recruiter
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
