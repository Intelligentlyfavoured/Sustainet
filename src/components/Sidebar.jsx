import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Modules/Login/logo2.png";
import "./sidebar.css"; 

const Sidebar = () => {
  const [role, setRole] = useState("");
  const storedRole = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    setRole(storedRole);
    // alert(storedRole)
  }, []);

  // Define role-based menu items
  const allMenuItems = [
    { title: "Initiate Voucher", path: "/create-voucher", roles: ["Admin", "Initiator"] },
    { title: "Create Supplier", path: "/create-supplier", roles: ["Admin"] },
    { title: "Review Voucher", path: "/reviewer", roles: ["Admin", "Reviewer"] },
    { title: "Authorize Voucher", path: "/VoucherAuthorization", roles: ["Admin", "Authorizer"] },
    { title: "Initiate Payment", path: "/PaymentInitiation", roles: ["Admin", "Initiator"] },
    { title: "Authorize Payment", path: "/PaymentAuthorization", roles: ["Admin", "Authorizer"] },
    { title: "Documentation", path: "/Documentation", roles: ["Admin"] },
    { title: "User Groups", path: "/userGroupsTable", roles: ["Admin"] },
    { title: "Users", path: "/ListContainer", roles: ["Admin"] },
  ];

 
  
  const menuItems = allMenuItems.filter(item => item.roles.includes( storedRole.role));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Link to="/AdminHome">
          <img src={logo} alt="Company Logo" className="sidebar-logo" />
        </Link>
      </div>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="sidebar-link">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="menu-separator" />

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
