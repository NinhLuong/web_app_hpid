export const fetchData = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
      headers,
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
