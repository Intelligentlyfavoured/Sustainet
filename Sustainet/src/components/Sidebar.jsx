import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Sidebar Menu Options
  const menuItems = [
    { title: "Initiate Voucher", path: "/create-voucher" },
    { title: "Create Supplier", path: "/create-supplier" },
    { title: "Review Voucher", path: "/reviewer" },
    { title: "Authorize Voucher", path: "/VoucherAuthorization" },
    { title: "Initiate Payment", path: "/PaymentInitiation" },
    { title: "Authorize Payment", path: "/PaymentAuthorization" },
    { title: "Documentation", path: "/Documentation" },
  ];

  // Logout function
  const handleLogout = () => {
    // Clear authentication data (if any)
    localStorage.removeItem("authToken");
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="sidebar-link">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Separator */}
      <hr className="menu-separator" />

      {/* Logout Button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
