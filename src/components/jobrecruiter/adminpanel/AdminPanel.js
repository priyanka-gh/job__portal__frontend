import React, { useEffect, useState } from "react";
import { getalljobsbyrecruiter, deleteajob } from "../../../apicalls/recruiter";
import "./AdminPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getalljobsbyrecruiter();
        setJobData(response); // Assuming that response is an array of job data
      } catch (error) {}
    };

    fetchData();
  }, []);

  const viewApplicants = (jobid) => {
    window.location.href = `/applicants/${jobid}`;
  };

  const editJob = (jobid) => {
    window.location.href = `update/${jobid}`;
  };

  const deleteJob = async (jobid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (confirmDelete) {
      try {
        await deleteajob(jobid);
        window.location.reload();
      } catch {}
    }
  };

  return (
    <div className="jobspanel">
      <div className="job__container">
        {jobData && jobData.length > 0 ? (
          jobData.map((job) => (
            <div key={job.jobid} className="job__card">
              <div className="job__info__row">
                <span className="job__info__label">Title :</span>
                <span className="job__info__value">{job.title}</span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Category :</span>
                <span className="job__info__value">{job.category}</span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Minimum Experience:</span>
                <span className="job__info__value">
                  {job.minYearsOfExperience}
                </span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Stipend :</span>
                <span className="job__info__value">{job.stipend}</span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Last Date To Register:</span>
                <span className="job__info__value">
                  {job.lastDateToRegister}
                </span>
              </div>
              <button
                className="job__details__button"
                onClick={() => viewApplicants(job.jobid)}
              >
                View Applicants
              </button>
              <div className="btn-group-wrap">
                <div className="btn-group">
                  <FontAwesomeIcon
                    className="fa-button"
                    icon={faPenToSquare}
                    onClick={() => editJob(job.jobid)}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="fa-button"
                    icon={faDeleteLeft}
                    onClick={() => deleteJob(job.jobid)}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
