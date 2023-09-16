import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import {
  getUserProfile,
  submitUserProfile,
  editUserProfile,
} from "../../../apicalls/jobseeker";
import "./createProfile.css"; // Make sure to import the correct CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";

const CreateProfile = (props) => {
  const location = useLocation();
  const parts = location.pathname.split("/"); // Split the pathname by "/"
  const userid = parts[parts.length - 1];

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Edit Profile");
  const [res, setRes] = useState("");

  const token = Cookies.get("access_token");
  const tokenParts = token.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));

  const [existingProfile, setExistingProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    roleTitle: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getUserProfile(userid);
        setExistingProfile({
          ...existingProfile,
          firstName: jobData.firstName || "",
          middleName: jobData.middleName || "",
          lastName: jobData.lastName || "",
          phone: jobData.phone || "",
          roleTitle: jobData.roleTitle || "",
        });

        const isAllFieldsEmpty = Object.values(jobData).every(
          (value) => !value
        );

        if (isAllFieldsEmpty) {
          setIsInputDisabled(false);
          setButtonLabel("Save Profile");
        }
      } catch (error) {
        // ""("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setIsInputDisabled(false);
    } else {
      setIsInputDisabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response1 = await submitUserProfile(existingProfile);
    if (response1.detail) {
      const response2 = await editUserProfile(existingProfile);
      setRes("Profile Updated");
    } else {
      setRes("Profile Added");
    }
  };

  return (
    <div className="profile-form">
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="profile-label">
            First Name
          </label>
          <input
            name="firstName"
            value={existingProfile.firstName}
            type="text"
            id="firstName"
            className="profile-input"
            disabled={isInputDisabled}
            onChange={(e) =>
              setExistingProfile({
                ...existingProfile,
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
            value={existingProfile.middleName}
            type="text"
            id="middleName"
            className="profile-input"
            disabled={isInputDisabled}
            onChange={(e) =>
              setExistingProfile({
                ...existingProfile,
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
            value={existingProfile.lastName}
            type="text"
            id="lastName"
            className="profile-input"
            disabled={isInputDisabled}
            onChange={(e) =>
              setExistingProfile({
                ...existingProfile,
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
            value={existingProfile.phone}
            type="text"
            id="phone"
            className="profile-input"
            disabled={isInputDisabled}
            onChange={(e) =>
              setExistingProfile({
                ...existingProfile,
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
            value={existingProfile.roleTitle}
            type="text"
            id="roleTitle"
            className="profile-input"
            disabled={isInputDisabled}
            onChange={(e) =>
              setExistingProfile({
                ...existingProfile,
                roleTitle: e.target.value,
              })
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
          <button type="submit" className="profile-button">
            Submit
          </button>
        </div>
      </form>
      <h4>{res}</h4>
    </div>
  );
};

export default CreateProfile;
