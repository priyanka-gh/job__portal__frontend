import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  getApplicants,
  updateApplicationStatus,
} from "../../../apicalls/recruiter";
import "./Applicants.css";

const Applicants = () => {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const jobid = parts[parts.length - 1];

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApplicants(jobid);
        setApplicants(response);
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [jobid]);

  const handleStatusChange = async (jobid, applicantid, newStatus) => {
    await updateApplicationStatus(jobid, applicantid, newStatus);
    // Update the status in the local state
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.applicationid === applicantid
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  return (
    <div className="applicants-container">
      {applicants?.length > 0 ? (
        applicants.map((applicant) => (
          <div key={applicant.applicationid} className="applicant-card">
            <h6 className="applicant-title">
              {applicant.firstName} {applicant.middleName} {applicant.lastName}
            </h6>
            <div className="applicant-info">
              <div className="applicant-info-row">
                <span className="applicant-info-label">Email:</span>
                <span className="applicant-info-value">{applicant.email}</span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Phone:</span>
                <span className="applicant-info-value">{applicant.phone}</span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">
                  Years of Experience:
                </span>
                <span className="applicant-info-value">
                  {applicant.minYearsOfExperience}
                </span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Applied At:</span>
                <span className="applicant-info-value">
                  {applicant.appliedAt}
                </span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Resume:</span>
                <span>
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </span>
              </div>
              {/* Dropdown to change the status */}
              <div className="applicant-info-row">
                <span className="applicant-info-label">Status:</span>
                <select
                  value="APPLIED" // Use applicant.status as value
                  onChange={(e) =>
                    handleStatusChange(
                      jobid,
                      applicant.applicationid,
                      e.target.value
                    )
                  }
                >
                  <option value="UNDER_CONSIDERATION">
                    UNDER_CONSIDERATION
                  </option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="HIRED">HIRED</option>
                </select>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No applicants for this job.</p>
      )}
    </div>
  );
};

export default Applicants;
