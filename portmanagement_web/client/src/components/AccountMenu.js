import { useState } from "react";
import AccountDropdown from "./AccountDropdown";

import profileImage from "../img/profile-image.png";
import useToken from "../useToken";

export default function AccountMenu() {
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const handleAccountMouseEnter = () => {
    setAccountDropdownVisible(true);
  };

  const handleAccountMouseLeave = () => {
    setAccountDropdownVisible(false);
  };

  const { setToken } = useToken();
  // console.log(token);

  return (
    <>
        <div
          className="menu account-menu"
          onMouseEnter={handleAccountMouseEnter}
          onMouseLeave={handleAccountMouseLeave}
        >
          <img src={profileImage} alt="" />
          {isAccountDropdownVisible && <AccountDropdown setToken={setToken}/>}
        </div>
    </>
  )
}
