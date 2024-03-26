import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.scss";
export default function UserDropdown() {
  return (
    <div className="dropdown-list">
      <ul>
        <li><Link to='/user-management' className='nav-link'>User Management</Link></li>
        <li><Link to='/right-assignment' className='nav-link'>Right Assignment</Link></li>
      </ul>
    </div>
  )
}
