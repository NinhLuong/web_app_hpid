import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import logo from "../img/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function loginUser(credentials) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid response from the server.");
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export default function Login({ setToken }) {
  const [adminname, setAdminname] = useState("");
  const [password, setPassword] = useState("");
  const setTokenRef = useRef(setToken);

  useEffect(() => {
    function logout() {
      localStorage.removeItem("token");
      setTokenRef.current("");
    }
    window.addEventListener("beforeunload", logout);
    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminname || !password) {
      toast.error("Please fill in both Administrator and Password fields.");
      return;
    }

    try {
      const response = await loginUser({
        adminname,
        password,
      });

      // console.log("Backend Response:", response);
      
      if (response === "Invailid adminname or password") {
        toast.error("Invailid adminname or password");
      } else if (response.token) {
        toast.success("Login successful!");
        setTimeout(() => {
          localStorage.setItem("token", response);
          setToken(response);
        }, 3000);
      } else {
        toast.error("Wrong adminname or password");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="nav-login">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-wrapper">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Administrator"
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-login" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};