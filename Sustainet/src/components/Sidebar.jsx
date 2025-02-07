import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({}); // Track which menus are open

  // 7 Main Options and Sub-options
  const menuItems = [
  
    { title: "Option 1", subOptions: ["Approved", "Rejected"] },
    { title: "Option 2", subOptions: ["Approved", "Rejected"] },
    { title: "Option 3", subOptions: ["Approved", "Rejected"] },
    { title: "Option 4", subOptions: ["Approved", "Rejected"] },
    { title: "Option 5", subOptions: ["Approved", "Rejected"] },
    { title: "Option 6", subOptions: ["Approved", "Rejected"] },
    { title: "Option 7", subOptions: ["Approved", "Rejected"] },
  ];

  // Toggle submenu visibility
  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>

      <ul className="menu">
        {/* Render 7 Main Options with Sub-options */}
        {menuItems.map((item, index) => (
          <li key={index}>
            <button className="submenu-toggle" onClick={() => toggleMenu(index)}>
              {item.title}
            </button>
            {openMenus[index] && (
              <ul className="submenu">
                {item.subOptions.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link to={`/option${index + 1}-sub${subIndex + 1}`}>
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* Separator for User Groups & Users */}
        <hr className="menu-separator" />

        {/* User Groups */}
        <li>
          <button className="submenu-toggle" onClick={() => toggleMenu("userGroups")}>
            User Groups
          </button>
          {openMenus["userGroups"] && (
            <ul className="submenu">
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/initiator">Initiator</Link></li>
              <li><Link to="/authorizer">Authorizer</Link></li>
              <li><Link to="/reviewer">Reviewer</Link></li>
              <li><Link to="/payment-initiator">Payment Initiator</Link></li>
              <li><Link to="/final-payment-authorizer">Final Payment Authorizer</Link></li>
            </ul>
          )}
        </li>

        {/* Users */}
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;