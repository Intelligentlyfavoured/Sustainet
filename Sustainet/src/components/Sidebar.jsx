import React from "react";
import { Link } from "react-router-dom";
// import {FaBell} from "react-icons/fa";

const Sidebar = ({userRole}) => {
  // Sidebar Menu Options
  const menuItems = [
    { title: "Initiate Voucher", path: "/create-voucher"},
    { title: "Create Supplier", path: "/create-supplier" },
    { title: "Review Voucher", path: "/reviewer" },
    { title: "Authorize Voucher", path: "/VoucherAuthorization" },
    { title: "Initiate Payment", path: "/PaymentInitiation" },
    { title: "Authorize Payment", path: "/PaymentAuthorization" },
    { title: "Documentation", path: "/documentation-voucher" },
  ];

  return (
    <div className="sidebar">

      <h3 className="sidebar-title" to="./Dashboard" >Dashboard</h3>

      <ul className="menu">
        {/* Main Navigation Links */}
        {menuItems?.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="sidebar-link">
              {item.title}
            </Link>
          </li>
        ))}

        {/* Separator */}
        <br /><br /><br /><hr className="menu-separator" />
    {/*user Groups*/}
        {/* Users */}
        <li>
          <h4 className ="menu-header"><Link to="/userGroupsTable" className="sidebar-link">User Groups</Link></h4>
          <h5 className="menu-header"><Link to="/ListContainer" className="sidebar-link">Users</Link></h5>
          {/* <ul className="submenu">
            <li><Link to="/admin" className="sidebar-link">Admin</Link></li>
            <li><Link to="/initiator" className="sidebar-link">Initiator</Link></li>
            <li><Link to="/authorizer" className="sidebar-link">Authorizer</Link></li>
            <li><Link to="/reviewer" className="sidebar-link">Reviewer</Link></li>
            <li><Link to="/payment-initiator" className="sidebar-link">Payment Initiator</Link></li>
            <li><Link to="/final-payment-authorizer" className="sidebar-link">Final Payment Authorizer</Link></li>
          </ul> */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
