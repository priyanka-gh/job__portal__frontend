import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Jobs from "./components/jobseeker/jobs/Jobs";
import JobInformation from "./components/jobseeker/jobInformation/JobInformation";
import CreateProfile from "./components/jobseeker/createProfile/CreateProfile";
import ApplyToJob from "./components/jobseeker/applyToJob/ApplyToJob";
import Adminpanel from "./components/jobrecruiter/adminpanel/AdminPanel";
import Applicants from "./components/jobrecruiter/applicants/Applicants";
import PostJob from "./components/jobrecruiter/postjob/PostJob";
import EditJob from "./components/jobrecruiter/editjob/EditJob";
import { useState } from "react";
import Cookies from "js-cookie";
import MyApplications from "./components/jobseeker/applications/MyApplications";

function App() {
  const token = Cookies.get("access_token");
  var role = 1;
  if (token) {
    const tokenParts = token?.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    role = payload.role;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {token ? (
            <Route path="/" element={<Jobs />} />
          ) : (
            <Route path="/" element={<Signup />} />
          )}
          {token ? (
            <Route path="/recruiter" element={<Adminpanel />} />
          ) : (
            <Route path="/recruiter" element={<Signup />} />
          )}
          {token ? (
            role === 0 ? (
              <Route path="/login" element={<Adminpanel />} />
            ) : (
              <Route path="/login" element={<Jobs />} />
            )
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route
            path="/admin"
            element={
              role === 0 ? (
                <Adminpanel />
              ) : (
                <Navigate to="/jobs" replace={true} />
              )
            }
          />
          <Route
            path="/applicants/:jobid"
            element={
              role === 0 ? (
                <Applicants />
              ) : (
                <Navigate to="/jobs" replace={true} />
              )
            }
          />
          <Route
            path="/post-job"
            element={
              role === 0 ? <PostJob /> : <Navigate to="/jobs" replace={true} />
            }
          />
          <Route
            path="/update/:jobid"
            element={
              role === 0 ? <EditJob /> : <Navigate to="/jobs" replace={true} />
            }
          />
          <Route path="/applications/:userid" element={<MyApplications />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:jobid" element={<JobInformation />} />
          <Route path="/profile/:userid" element={<CreateProfile />} />
          <Route path="/apply/:jobid" element={<ApplyToJob />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
