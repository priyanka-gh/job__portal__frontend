import React, { useState, useEffect } from "react";
import { getAllJobs } from "../../../apicalls/jobseeker";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  const viewJobDetails = (jobid) => {
    window.location.href = `/job/${jobid}`;
  };

  return (
    <div className="job__container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.jobid} className="job__card">
            <h6 className="job__title">{job.title}</h6>
            <div className="job__info">
              <div className="job__info__row">
                <span className="job__info__label">Company:</span>
                <span className="job__info__value">{job.companyName}</span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Minimum Experience:</span>
                <span className="job__info__value">
                  {job.minYearsOfExperience}
                </span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Company Name:</span>
                <span className="job__info__value">{job.companyName}</span>
              </div>
              <div className="job__info__row">
                <span className="job__info__label">Stipend:</span>
                <span className="job__info__value">{job.stipend}</span>
              </div>
              {job.active === 0 ? (
                <p className="job__status">No longer accepting</p>
              ) : null}
            </div>
            <div>
              <button
                className="job__details__button"
                onClick={() => viewJobDetails(job.jobid)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default Jobs;
