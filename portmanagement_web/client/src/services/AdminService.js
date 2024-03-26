// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: token,
// };
const api_admin_url = `${process.env.REACT_APP_API_URL}/admin`;
const api_admin_change_pass_url = `${api_admin_url}?password=true`;


export const getAdmin = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(api_admin_url, {
      headers: {
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

export const postAdmin = async (
  adminname,
  email,
  password,
  confirmpassword,
  fullname,
  token
) => {
  const data = { adminname, email, password, confirmpassword, fullname };
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return;
    }
    const response = await fetch(api_admin_url, {
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

export const patchAdmin = async (adminname, email, fullname, token) => {
  const data = { adminname, email, fullname };
  try {
    const response = await fetch(api_admin_url, {
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

export const deleteAdmin = (selectedItems, token) => {
  const deletePromises = selectedItems.map((admin) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        adminname: admin.adminname,
      }),
    };

    return fetch(api_admin_url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        if (text === "Admin removed") {
          return "Admin removed successfully";
        } else {
          throw new Error("Unexpected response: " + text);
        }
      });
  });

  return Promise.all(deletePromises);
};


export const changePassAdmin = async (password, token) => {
  const data = { password };
  try {
    const response = await fetch(api_admin_change_pass_url, {
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
    if (responseData === "Edit password done") {
      return "Edit successfully";
    } else {
      throw new Error(responseData);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};