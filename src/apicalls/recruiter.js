import Cookies from "js-cookie";
import axios from "axios";

import { API } from "../Backend";

export const getalljobsbyrecruiter = async () => {
  const response = await fetch(`${API}/recruiter/job`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    "data ", data;
    return data;
  } else {
    const errorData = await response.json();
    "data apply", errorData;
  }
};

export const getApplicants = async (jobid) => {
  const response = await fetch(`${API}/recruiter/job/${jobid}/applicants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    "data ", data;
    return data;
  } else {
    const errorData = await response.json();
    "data apply", errorData;
  }
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
};

export const updateApplicationStatus = async (
  jobid,
  applicationid,
  newstatus
) => {
  const response = await axios.put(
    `${API}/recruiter/job/${jobid}/applications/${applicationid}`,
    { status: newstatus },
    config
  );
};

export const createJob = async (formData) => {
  const response = await axios.post(`${API}/recruiter/job`, formData, config);
};

export const editJob = async (jobid, formData) => {
  const response = await axios.put(
    `${API}/recruiter/job/${jobid}`,
    formData,
    config
  );
};

const getconfig = {
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
};
export const getjob = async (jobid) => {
  try {
    const response = await axios.get(
      `${API}/recruiter/job/${jobid}`,
      getconfig
    );
    return response.data; // Return the response data, not the entire response object
  } catch (error) {
    throw error; // Handle errors appropriately in the calling code
  }
};

export const deleteajob = async (jobid) => {
  try {
    const response = await axios.delete(
      `${API}/recruiter/job/${jobid}`,
      getconfig
    );
    return " ";
  } catch (error) {
    return error;
  }
};
