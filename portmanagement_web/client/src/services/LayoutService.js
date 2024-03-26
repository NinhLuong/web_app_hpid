// const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: token,
// };
const api_layout_url = `${process.env.REACT_APP_API_URL}/layout`;

export const getLayout = async (token) => {
  try {
    if (!token) {
      console.error("Token is missing or invalid. Please log in.");
      return null;
    }
    const response = await fetch(api_layout_url, {
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

export const postLayout = (layoutname, image, token) => {
  const formData = new FormData();
  formData.append("layoutname", layoutname);
  formData.append("file", image);

  return fetch(api_layout_url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((res) => res)
    .catch((error) => {
      console.error(">> Error:", error);
      throw error;
    });
};

// export const patchLayout = (id, layoutname, image, token) => {
//   const formData = new FormData();
//   formData.append("id", id);
//   formData.append("layoutname", layoutname);
//   formData.append("file", image);

//   return fetch(`${process.env.REACT_APP_API_URL}/layout`, {
//     method: "PATCH",
//     headers: {
//       Authorization: token,
//     },
//     body: formData,
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error(">> Error:", error);
//       throw error;
//     });
// };

export const patchLayout = (id, layoutname, image, token) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("layoutname", layoutname);
  formData.append("file", image);

  return fetch(api_layout_url, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.text())
    .then((res) => res)
    .catch((error) => {
      console.error(">> Error:", error);
      throw error;
    });
};

export const deleteLayout = (selectedItems, token) => {
  if (!token) {
    console.error("Token is missing or invalid. Please log in.");
    return;
  }

  const deletePromises = selectedItems.map((admin) => {
    const requestOptions = {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        layoutname: admin.layoutname,
      }),
    };

    return fetch(api_layout_url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.text();
      })
      .then((text) => {
        if (text === "Layout removed") {
          return "Layout removed successfully";
        } else {
          throw new Error("Unexpected response: " + text);
        }
      });
  });

  return Promise.all(deletePromises);
};
