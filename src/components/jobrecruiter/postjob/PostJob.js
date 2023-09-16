import Cookies from "js-cookie";
import React, { useState } from "react";
import { createJob } from "../../../apicalls/recruiter"; // Import your API function for creating a job
import "./PostJob.css"; // Adjust the CSS file path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const PostJob = () => {
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Set to true if you want the form to be editable by default
  const [buttonLabel, setButtonLabel] = useState("Edit Job");
  const [error, setError] = useState("");

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

  const token = Cookies.get("access_token");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setIsInputDisabled(!isInputDisabled);
    setButtonLabel(isEditing ? "Save Job" : "Edit Job");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(jobData);
      window.location.href = "/admin";
    } catch (error) {
      setError("Could not create the job:", error);
    }
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
          <select
            name="category"
            value={jobData.category}
            id="category"
            className="job-input"
            disabled={isInputDisabled}
            onChange={(e) => {
              setJobData({ ...jobData, category: e.target.value });
            }}
          >
            <option value="">Select a Category</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Web Development">Web Development</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack">Full Stack</option>
          </select>
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
            disabled={isInputDisabled}
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
        {error}
      </form>
    </div>
  );
};

export default PostJob;
