import React from 'react';
import { Link } from 'react-router-dom';
export default function PortDropdown() {
  return (
    <div className="dropdown-list">
      <ul>
        <li><Link to='/layout-management' className='nav-link'>Layout Management</Link></li>
        <li><Link to='/port-assignment' className='nav-link'>Port Assignment</Link></li>
        <li><Link to='/port-scheduler' className='nav-link'>Port Scheduler</Link></li>
      </ul>
    </div>
  )
}
