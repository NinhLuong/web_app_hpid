import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import PortDropdown from "./PortDropdown";
import AdminDropdown from "./AdminDropdown";
import "./SideBarMenu.scss";
import { slide as Menu } from "react-burger-menu";

export default function SideBarMenu() {
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
  const [isPortDropdownVisible, setPortDropdownVisible] = useState(false);
  const [isAdminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 960);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const handleUserMouseEnter = () => {
    setUserDropdownVisible(true);
  };
  const handlePortMouseEnter = () => {
    setPortDropdownVisible(true);
  };
  const handleAdminMouseEnter = () => {
    setAdminDropdownVisible(true);
  };

  const handleUserMouseLeave = () => {
    setUserDropdownVisible(false);
  };
  const handlePortMouseLeave = () => {
    setPortDropdownVisible(false);
  };
  const handleAdminMouseLeave = () => {
    setAdminDropdownVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  return (
    <>
      {isLargeScreen ? (
        <div className="App-header">
          <Link to="/" className="menu nav-link">
            <span>HOME</span>
          </Link>
          <div
            className="menu"
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
          >
            <span>USER</span>
            {isUserDropdownVisible && <UserDropdown />}
          </div>
          <div
            className="menu"
            onMouseEnter={handlePortMouseEnter}
            onMouseLeave={handlePortMouseLeave}
          >
            <span>PORT</span>
            {isPortDropdownVisible && <PortDropdown />}
          </div>
          <div
            className="menu"
            onMouseEnter={handleAdminMouseEnter}
            onMouseLeave={handleAdminMouseLeave}
          >
            <span>ADMIN</span>
            {isAdminDropdownVisible && <AdminDropdown />}
          </div>
        </div>
      ) : (
        <div className="menu-mobile">
          <Menu isOpen={isBurgerMenuOpen} onStateChange={(state) => setBurgerMenuOpen(state.isOpen)}>           
            <ul>
              <li>
                <Link to="/" className="nav-link" onClick={closeBurgerMenu}>
                  HOME
                </Link>
              </li>
              <li>
                USER
                <ul>
                  <li>
                    <Link to="/user-management" className="nav-link" onClick={closeBurgerMenu}>
                      User Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/right-assignment" className="nav-link" onClick={closeBurgerMenu}>
                      Right Assignment
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                PORT
                <ul>
                  <li>
                    <Link to="/layout-management" className="nav-link" onClick={closeBurgerMenu}>
                      Layout Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/port-assignment" className="nav-link" onClick={closeBurgerMenu}>
                      Port Assignment
                    </Link>
                  </li>
                  <li>
                    <Link to="/port-scheduler" className="nav-link" onClick={closeBurgerMenu}>
                      Port Scheduler
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                ADMIN
                <ul>
                  <li>
                    <Link to="/administrator" className="nav-link" onClick={closeBurgerMenu}>
                      Administrator
                    </Link>
                  </li>
                  <li>
                    <Link to="/audit-log" className="nav-link" onClick={closeBurgerMenu}>
                      Audit Log
                    </Link>
                  </li>
                  <li>
                    <Link to="/report" className="nav-link" onClick={closeBurgerMenu}>
                      Report
                    </Link>
                  </li>
                  <li>
                    <Link to="/device-detection" className="nav-link" onClick={closeBurgerMenu}>
                      Device Detection
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </Menu>
        </div>
      )}
    </>
  );
}
