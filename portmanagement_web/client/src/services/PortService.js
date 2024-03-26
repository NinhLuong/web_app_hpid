// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: token,
// };
const api_port_url = `${process.env.REACT_APP_API_URL}/port`;
const api_user_url = `${process.env.REACT_APP_API_URL}/user`;
const api_layout_url = `${process.env.REACT_APP_API_URL}/layout`;

export const getPort = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(api_port_url, {
      headers:{
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const patchPort = async (
  portname,
  layoutname,
  username,
  status,
  token
) => {
  const data = { portname, layoutname, username, status };
  try {
    const response = await fetch(api_port_url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Request failed with status code " + response.status);
    }
    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export function getLayoutOptions() {
  const token = localStorage.token
    ? JSON.parse(localStorage.token).token
    : null;
  return fetch(api_layout_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Options data is not an array");
      }
      return data.map((item) => ({
        id: item.id,
        layoutname: item.layoutname,
      }));
    })
    .catch((error) => {
      console.error("Error fetching options:", error);
      throw error;
    });
}

export function getUserOptions() {
  const token = localStorage.token
    ? JSON.parse(localStorage.token).token
    : null;
  return fetch(api_user_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Options data is not an array");
      }
      return data.map((item) => ({
        id: item.id,
        username: item.username,
      }));
    })
    .catch((error) => {
      console.error("Error fetching options:", error);
      throw error;
    });
}
