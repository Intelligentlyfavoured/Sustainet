import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // 7 Main Options (No Sub-options)
  const menuItems = [
    { title: "Create Voucher", path: "/create-voucher" },
    { title: "Review Voucher", path: "/review-voucher" },
    { title: "Authorize Voucher", path: "/authorize-voucher" },
    { title: "Initiate Voucher", path: "/initiate-voucher" },
    { title: "Final-Payment Voucher", path: "/payment-voucher" },
    { title: "Post-Payment Documentation Voucher", path: "/documentation-voucher" },
  ];

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>

      <ul className="menu">
        {/* Render 7 Main Options */}
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="menu-item">
              {item.title}
            </Link>
          </li>
        ))}

        {/* Separator for User Groups & Users */}
        <hr className="menu-separator" />

        {/* User Groups */}
        <li>
          <button className="submenu-toggle">User Groups</button>
          <ul className="submenu">
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/initiator">Initiator</Link></li>
            <li><Link to="/authorizer">Authorizer</Link></li>
            <li><Link to="/reviewer">Reviewer</Link></li>
            <li><Link to="/payment-initiator">Payment Initiator</Link></li>
            <li><Link to="/final-payment-authorizer">Final Payment Authorizer</Link></li>
          </ul>
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
