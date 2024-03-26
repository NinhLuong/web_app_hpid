// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;

const api_layout_url = `${process.env.REACT_APP_API_URL}/layout`;
const api_port_url = `${process.env.REACT_APP_API_URL}/port`;

export const getHomeLayout = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
    const response = await fetch(api_layout_url, {
      headers,
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


export const getHomePort = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
    const response = await fetch(api_port_url, {
      headers,
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};