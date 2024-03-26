import React from "react";
import { Link } from 'react-router-dom';
export default function AdminDropdown() {
  return (
    <div className="dropdown-list">
      <ul>
        <li><Link to='/administrator' className='nav-link'>Administrator</Link></li>
        <li><Link to='/audit-log' className='nav-link'>Audit Log</Link></li>
        <li><Link to='/report' className='nav-link'>Report</Link></li>
        <li><Link to='/device-detection' className='nav-link'>Device Detection</Link></li>
      </ul>
    </div>
  );
}
