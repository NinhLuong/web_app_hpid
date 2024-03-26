import React from "react";
import PropTypes from "prop-types";
import ChangePasswordAdmin from "../pages/admin/Administrator/ChangePasswordAdmin";

export default function AccountDropdown({ setToken }) {
  const handleLogout = async () => {
    console.log("Logging out...");
    if (localStorage && localStorage.token) {
      localStorage.removeItem("token");
    }
    window.location.reload();
  };

  return (
    <div className="account-dropdown">
      <ul>
        <li>
          <ChangePasswordAdmin />
        </li>
        <li>
          <div className="nav-link" onClick={handleLogout}>
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}

AccountDropdown.propTypes = {
  setToken: PropTypes.func.isRequired,
};
