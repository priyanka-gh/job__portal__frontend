import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUserProfile } from "../../../apicalls/jobseeker";
import { API } from "../../../Backend";
import { useLocation } from "react-router";

function ApplyToJob() {
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by "/"
  const jobid = parts[parts.length - 1];

  const token = Cookies.get("access_token");
  const tokenParts = token.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const userid = payload.sub;
  const [isInputDisabled, setIsInputDisabled] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    roleTitle: "",
    resumeLink: "",
    minYearsOfExperience: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getUserProfile(userid);
        setFormData({
          ...formData,
          firstName: jobData.firstName || "",
          middleName: jobData.middleName || "",
          lastName: jobData.lastName || "",
          phone: jobData.phone || "",
          roleTitle: jobData.roleTitle || "",
          resumeLink: jobData.resumeLink || "", // Set the resume link
          minYearsOfExperience: jobData.minYearsOfExperience || "",
        });
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [userid]);

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setIsInputDisabled(false);
    } else {
      setIsInputDisabled(true);
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resumeLink: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const formDataForRequest = new FormData();
    formDataForRequest.append("firstName", formData.firstName);
    formDataForRequest.append("middleName", formData.middleName);
    formDataForRequest.append("lastName", formData.lastName);
    formDataForRequest.append("phone", formData.phone);
    formDataForRequest.append("roleTitle", formData.roleTitle);

    formDataForRequest.append(
      "minYearsOfExperience",
      formData.minYearsOfExperience
    );
    formDataForRequest.append("resumeLink", formData.resumeLink);

    try {
      const response = await axios.post(
        `${API}/job/apply/${jobid}`,
        formDataForRequest,
        config
      );

      setResponse("Successfully Applied");
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.detail[0].msg) {
          setResponse(error.response.data.detail[0].msg);
        } else {
          setResponse(error.response.data.detail);
        }
      } else if (error.request) {
        setResponse("No response received from the server.");
      } else {
        setResponse("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit} className="profile-card">
        <div className="form-group">
          <label htmlFor="firstName" className="profile-label">
            First Name
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            type="text"
            id="firstName"
            className="profile-input"
            disabled={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                firstName: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="middleName" className="profile-label">
            Middle Name
          </label>
          <input
            name="middleName"
            value={formData.middleName}
            type="text"
            id="middleName"
            className="profile-input"
            disabled={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                middleName: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="profile-label">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            type="text"
            id="lastName"
            className="profile-input"
            disabled={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="profile-label">
            Contact
          </label>
          <input
            name="phone"
            value={formData.phone}
            type="text"
            id="phone"
            className="profile-input"
            disabled={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="profile-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="profile-input"
            defaultValue={payload.email}
            disabled={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roleTitle" className="profile-label">
            Role Title
          </label>
          <input
            name="roleTitle"
            value={formData.roleTitle}
            type="text"
            id="roleTitle"
            className="profile-input"
            disabled={true}
            onChange={(e) =>
              setFormData({
                ...formData,
                roleTitle: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="minYearsOfExperience">Years of Experience:</label>
          <input
            className="profile-input"
            type="text"
            id="minYearsOfExperience"
            name="minYearsOfExperience"
            value={formData.minYearsOfExperience}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="resumeLink">Resume </label>
          <input
            className="profile-input"
            name="resumeLink"
            type="file"
            id="resumeLink"
            onChange={handleFileChange} // Handle file selection
          />
        </div>
        <div className="res">
          <button type="submit" className="profile-button">
            Submit
          </button>
          <div>{response}</div>
        </div>
      </form>
    </div>
  );
}

export default ApplyToJob;
