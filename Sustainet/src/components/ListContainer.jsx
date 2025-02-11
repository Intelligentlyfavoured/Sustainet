import "./ListContainer.css";
import Sidebar from "./Sidebar";
import React, { useState } from "react";

export default function ListContainer() {
  const roles = [
    "Admin",
    "Initiator",
    "Authorizer",
    "Reviewer",
    "Payment Initiator",
    "Final Payment Authorizer",
  ];

  return (
    <div className="list-container">
        <Sidebar /> 
      <h2 className="list-title">Roles</h2>
      <ul className="list-items">
        {roles.map((role, index) => (
          <li key={index} className="list-item">{role}</li>
        ))}
      </ul>
    </div>
  );
}
