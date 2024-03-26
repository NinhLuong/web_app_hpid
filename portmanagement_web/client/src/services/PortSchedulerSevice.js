// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: token,
// };
const api_port_scheduler_url = `${process.env.REACT_APP_API_URL}/scheduler`;
const api_port_layout_url = `${process.env.REACT_APP_API_URL}/layout`;

export const getPortScheduler = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(api_port_scheduler_url, {
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

export const postPortScheduler = async (requestData, token) => {
  try {
    // Kiểm tra token
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }
    const response = await fetch(api_port_scheduler_url, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestData),
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

export const deletePortScheduler = (selectedItems, token) => {
  const deletePromises = selectedItems.map((scheduler) => {
    const requestOptions = {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        id: scheduler.id,
      }),
    };

    return fetch(api_port_scheduler_url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.text();
      })
      .then((text) => {
        if (text === "Scheduler removed") {
          return "Scheduler removed successfully";
        } else {
          throw new Error("Unexpected response: " + text);
        }
      });
  });

  return Promise.all(deletePromises);
};

export function getLayoutOptions() {
  const token = localStorage.token
    ? JSON.parse(localStorage.token).token
    : null;
  return fetch(api_port_layout_url, {
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
        portnames: item.portlist.map((port) => port.portname),
      }));
    })
    .catch((error) => {
      console.error("Error fetching options:", error);
      throw error;
    });
}
