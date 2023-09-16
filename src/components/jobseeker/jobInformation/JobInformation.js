import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getThisJob } from "../../../apicalls/jobseeker";
import "./JobInformation.css";

const JobInformation = (props) => {
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by "/"
  const jobid = parts[parts.length - 1];

  const [job, setJob] = useState(null); // Initialize as null to handle loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getThisJob(jobid);
        setJob(jobData);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, [jobid]);

  const applyToJob = (jobid) => {
    window.location.pathname = `apply/${jobid}`;
  };
  return (
    <div className="job__info__container">
      {job ? (
        <div>
          <h1>
            {job[0]?.title}
            <span> Job at {job[0]?.companyName}</span>
          </h1>
          <div className="info__wrapper_main">
            <h4>{job[0]?.title}</h4>
            <h4>{job[0]?.companyName}</h4>
            <h4>{job[0]?.postedBy}</h4>
            <div className="info__wrapper">
              <div>
                <h4>Minimum Years Of Experience</h4>
                <p>
                  <b>{job[0]?.minYearsOfExperience}</b>
                </p>
              </div>
              <div>
                <h4>Category</h4>
                <p>
                  <b>{job[0]?.category}</b>
                </p>
              </div>
              <div>
                <h4>₹</h4>
                <p>
                  <b>{job[0]?.stipend}</b>
                </p>
              </div>
              <div>
                <h4>Apply by</h4>
                <p>
                  <b>{job[0]?.lastDateToRegister}</b>
                </p>
              </div>
            </div>
            <br />
            <hr />
            <div className="info__details">
              <h4>About {job[0]?.companyName}</h4>
              <p>
                <i>{job[0]?.companyDescription}</i>
              </p>
            </div>
            <div className="info__details">
              <h4>About {job[0]?.title} Job</h4>
              <p>
                <i>{job[0]?.jobDescription}</i>
              </p>
            </div>
            <button
              type="submit"
              className="apply-button"
              onClick={() => {
                applyToJob(job[0]?.jobid);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobInformation;
