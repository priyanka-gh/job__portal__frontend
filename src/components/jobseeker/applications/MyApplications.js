import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getuserapplications } from "../../../apicalls/jobseeker";
import "./MyApplications.css";

const MyApplications = () => {
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by "/"
  const userid = parts[parts.length - 1];

  const [applications, setapplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getuserapplications(userid);
        setapplications(response.data);
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [userid]);

  return (
    <div className="applicants-container">
      {applications && applications.length > 0 ? (
        applications.map((applicant) => (
          <div key={applicant.applicationid} className="applicant-card">
            <h6 className="applicant-title">
              {applicant.firstName} {applicant.middleName} {applicant.lastName}
            </h6>
            <div className="applicant-info">
              <div className="applicant-info-row">
                <span className="applicant-info-label">Company's Name:</span>
                <span className="applicant-info-value">
                  {applicant.companyName}
                </span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Email:</span>
                <span className="applicant-info-value">
                  {applicant.postedBy}
                </span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Applied At:</span>
                <span className="applicant-info-value">
                  {applicant.appliedAt}
                </span>
              </div>
              <div className="applicant-info-row">
                <span className="applicant-info-label">Status:</span>
                <span className="applicant-info-value">{applicant.status}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default MyApplications;
