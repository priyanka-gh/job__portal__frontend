import { API } from "../Backend";

export const handleUserSignup = async (userData) => {
  const response = await fetch(
    `${API}/users/signup`, // Add "https://" protocol
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert userData to JSON string
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
  }
};

export const handleUserLogin = async (formData) => {
  const response = await fetch(`${API}/users/token`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};
