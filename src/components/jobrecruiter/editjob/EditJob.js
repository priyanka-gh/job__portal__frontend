import Cookies from "js-cookie";
import React, { useState } from "react";
import { createJob, editJob, getjob } from "../../../apicalls/recruiter"; // Import your API function for creating a job
import "./EditJob.css"; // Adjust the CSS file path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useLocation } from "react-router";

const PostJob = () => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Set to false if you want the form to be non-editable by default
  const [buttonLabel, setButtonLabel] = useState("Edit Job");
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by "/"
  const jobid = parts[parts.length - 1];

  const [jobData, setJobData] = useState({
    title: "",
    jobDescription: "",
    minYearsOfExperience: 0,
    category: "",
    lastDateToRegister: "",
    companyName: "",
    companyDescription: "",
    active: 1,
    stipend: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobDetails = await getjob(jobid);
        setJobData({
          ...jobData,
          title: jobDetails.title || "",
          jobDescription: jobDetails.jobDescription || "",
          minYearsOfExperience: jobDetails.minYearsOfExperience || 0,
          category: jobDetails.category || "",
          lastDateToRegister: jobDetails.lastDateToRegister || "",
          companyName: jobDetails.companyName || "",
          companyDescription: jobDetails.companyDescription || "",
          active: jobDetails.active || "",
          stipend: jobDetails.stipend || "",
        });
      } catch (error) {}
    };

    fetchData();
  }, [jobid]);

  const toggleEditing = () => {
    console.log("first", location);
    setIsEditing(!isEditing);
    setIsInputDisabled(!isInputDisabled);
    setButtonLabel(isEditing ? "Edit Job" : "Save Job");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editJob(jobid, jobData);
      window.location.href = "/admin";
    } catch (error) {}
  };

  return (
    <div className="job-form">
      <form className="job-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="job-label">
            Job Title
          </label>
          <input
            name="title"
            value={jobData.title}
            type="text"
            id="title"
            className="job-input"
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription" className="job-label">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            value={jobData.jobDescription}
            id="jobDescription"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, jobDescription: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="minYearsOfExperience" className="job-label">
            Minimum Years of Experience
          </label>
          <input
            name="minYearsOfExperience"
            value={jobData.minYearsOfExperience}
            type="number"
            id="minYearsOfExperience"
            className="job-input"
            onChange={(e) =>
              setJobData({
                ...jobData,
                minYearsOfExperience: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="job-label">
            Category
          </label>
          <input
            name="category"
            value={jobData.category}
            type="text"
            id="category"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, category: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDateToRegister" className="job-label">
            Last Date to Register
          </label>
          <input
            name="lastDateToRegister"
            value={jobData.lastDateToRegister}
            type="date"
            id="lastDateToRegister"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, lastDateToRegister: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyName" className="job-label">
            Company Name
          </label>
          <input
            name="companyName"
            value={jobData.companyName}
            type="text"
            id="companyName"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, companyName: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyDescription" className="job-label">
            Company Description
          </label>
          <textarea
            name="companyDescription"
            value={jobData.companyDescription}
            id="companyDescription"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, companyDescription: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="active" className="job-label">
            Active
          </label>
          <select
            name="active"
            value={jobData.active}
            id="active"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, active: parseInt(e.target.value) })
            }
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stipend" className="job-label">
            Stipend
          </label>
          <input
            name="stipend"
            value={jobData.stipend}
            type="text"
            id="stipend"
            className="job-input"
            onChange={(e) =>
              setJobData({ ...jobData, stipend: e.target.value })
            }
          />
        </div>

        <div className="btn-group">
          <FontAwesomeIcon
            onClick={toggleEditing}
            className="fa-button"
            icon={faPenToSquare}
          >
            {" "}
            {buttonLabel}
          </FontAwesomeIcon>
          <button type="submit" className="job-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
