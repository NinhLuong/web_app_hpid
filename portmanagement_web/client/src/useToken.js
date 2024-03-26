import { useState, useEffect } from "react";

// export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     if (tokenString) {
//       try {
//         const userToken = JSON.parse(tokenString);
//         return userToken.token;
//       } catch (error) {
//         console.error('Error parsing token:', error);
//       }
//     }
//     return null;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     const tokenString = JSON.stringify(userToken);
//     localStorage.setItem('token', tokenString);
//     setToken(userToken?.token);
//   };

//   return {
//     setToken: saveToken,
//     token
//   };
// }

// export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem("token");
//     if (tokenString) {
//       try {
//         const userToken = JSON.parse(tokenString);
//         return userToken.token;
//       } catch (error) {
//         console.error("Error parsing token:", error);
//       }
//     }
//     return null;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = (userToken) => {
//     const tokenString = JSON.stringify(userToken);
//     localStorage.setItem("token", tokenString);

//     window.postMessage(
//       { type: "TOKEN_UPDATED", token: userToken?.token },
//       window.location.origin
//     );
//   };

//   useEffect(() => {
//     const handleTokenUpdate = (event) => {
//       if (
//         event.origin === window.location.origin &&
//         event.data.type === "TOKEN_UPDATED"
//       ) {
//         setToken(event.data.token);
//       }
//     };

//     window.addEventListener("message", handleTokenUpdate);

//     return () => {
//       window.removeEventListener("message", handleTokenUpdate);
//     };
//   }, []);

//   return {
//     setToken: saveToken,
//     token,
//   };
// }

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      try {
        const userToken = JSON.parse(tokenString);
        return userToken.token;
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    const tokenString = JSON.stringify(userToken);
    localStorage.setItem("token", tokenString);

    window.postMessage(
      { type: "TOKEN_UPDATED", token: userToken?.token },
      window.location.origin
    );

    // Xóa token sau 10 giờ
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
    }, 10 * 60 * 60 * 1000); // 10 giờ
  };

  useEffect(() => {
    const handleTokenUpdate = (event) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === "TOKEN_UPDATED"
      ) {
        setToken(event.data.token);
      }
    };

    window.addEventListener("message", handleTokenUpdate);

    return () => {
      window.removeEventListener("message", handleTokenUpdate);
    };
  }, []);

  return {
    setToken: saveToken,
    token,
  };
}