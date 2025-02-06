import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaInfoCircle } from 'react-icons/fa';

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>
      
      {/* Main Menu Items */}
      <ul className="menu">
        <li>
          <Link to="/home">
            {/* <FaHome size={20} /> */}
            Option1
          </Link>
        </li>
        <li>
          <Link to="/profile">
            {/* <FaUser size={20} /> */}
            Option2          </Link>
        </li>
        <li>
          <Link to="/settings">
            {/* <FaCog size={20} /> */}
            Option3
          </Link>
        </li>
        <li>
          <Link to="/about">
            {/* <FaInfoCircle size={20} /> */}
            Option4
          </Link>
        </li>
        <br /><br /><br />

        {/* Cascading submenu */}
        <li>
          <button className="submenu-toggle" onPointerEnter={() => setShowSubMenu(!showSubMenu)}>
            User Groups
          </button>
          {showSubMenu && (
            <ul className="submenu">
              <li><Link to="/option1">Admin</Link></li>
              <li><Link to="/option2">Initiator</Link></li>
              <li><Link to="/option3">Authorizer</Link></li>
              <li><Link to="/option3">Reviewer</Link></li>
              <li><Link to="/option3">Payment Initiator</Link></li>
              <li><Link to="/option3">Final Payment Authorizer</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
