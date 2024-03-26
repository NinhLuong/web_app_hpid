// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: token,
// };
const api_user_url = `${process.env.REACT_APP_API_URL}/user`;
const api_user_right_url = `${process.env.REACT_APP_API_URL}/right`;
// const api_import_user_url = `${process.env.REACT_APP_API_URL}/user?csv=true`;
const apiUrlWithRightParam = `${process.env.REACT_APP_API_URL}/user?right=true`;

export const getUser = async (token) => {
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(api_user_url, {
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

export const postUser = async (username, email, group, token) => {
  const data = { username, email, group };
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
      method: "POST",
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

export const postImportUser = async (token) => {
  const data = {};
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
      method: "POST",
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

export const patchUser = async (username, newusername, email, group, token) => {
  const data = { username, newusername, email, group };
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const response = await fetch(api_user_url, {
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

export const deleteUser = async (selectedItems, token) => {
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return;
    }

    const deletePromises = selectedItems.map((user) => {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          username: user.username,
        }),
      };

      return fetch(api_user_url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((text) => {
          if (text === "User removed") {
            return "User removed successfully";
          } else {
            throw new Error("Unexpected response: " + text);
          }
        });
    });

    return Promise.all(deletePromises);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getUserRight = async (token) => {
  try {
    if (!token) {
      //console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(apiUrlWithRightParam, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const patchUserRight = async (username, right, token) => {
  const data = { username, right };
  try {
    const response = await fetch(apiUrlWithRightParam, {
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

export function getOptions() {
  const token = localStorage.token
    ? JSON.parse(localStorage.token).token
    : null;
  return fetch(api_user_right_url, {
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
        right: item.right,
        vlan: item.vlan,
      }));
    })
    .catch((error) => {
      console.error("Error fetching options:", error);
      throw error;
    });
}
