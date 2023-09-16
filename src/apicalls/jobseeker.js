import Cookies from "js-cookie";
import React from "react";
import axios from "axios";

import { API } from "../Backend";

export const submitUserProfile = async (userData) => {
  let userid = null; // Declare userid outside the if block
  const token = Cookies.get("access_token");
  if (token != undefined) {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    userid = payload.sub; // Assign a value to userid
  }

  const response = await fetch(`${API}/job/${userid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`, // Include the Bearer token
      "Content-Type": "application/json", // Set the content type as needed
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();

    return errorData;
  }
};

export const editUserProfile = async (userData) => {
  let userid = null; // Declare userid outside the if block
  const token = Cookies.get("access_token");
  if (token != undefined) {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    userid = payload.sub; // Assign a value to userid
  }

  const response = await fetch(`${API}/job/${userid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`, // Include the Bearer token
      "Content-Type": "application/json", // Set the content type as needed
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();

    return errorData;
  }
};

export const getAllJobs = async () => {
  const response = await fetch(`${API}/job`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const getThisJob = async (jobid) => {
  const response = await fetch(`${API}/job/${jobid}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const getUserProfile = async (userid) => {
  const response = await fetch(`${API}/job/user-profile/${userid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`, // Include the Bearer token
      "Content-Type": "application/json", // Set the content type as needed
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const applyToJob = async (jobid, formData) => {
  const response = await fetch(`${API}/job/apply/${jobid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`, // Include the Bearer token
      "Content-Type": "multipart/form-data; boundary=my-boundary",
    },
    body: formData,
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData.response.detail;
  }
};

const getconfig = {
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
};

export const getuserapplications = async (userid) => {
  try {
    const response = await axios.get(
      `${API}/job/applications/${userid}`,
      getconfig
    );
    return response;
  } catch (error) {
    return error;
  }
};
