import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.scss";
import logo from "../img/logo.png";
import SideBarMenu from './SideBarMenu';
import AccountMenu from './AccountMenu';
export default function NavBar() {
  return (
    <>
    <nav>
        <Link to='/' className='nav-link logo-link'><img src={logo} alt="Logo" /></Link>       
        {/* <SideBarMenu /> */}
        <SideBarMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} className="sidebar-menu"/>
        <AccountMenu />
    </nav>
        
    </>
  )
}
