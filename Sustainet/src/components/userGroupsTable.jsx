import React, { useEffect, useState } from "react";
import "./UserGroupsTable.css"; // Import the CSS file
import Sidebar from "./Sidebar";

const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/users";
const AUTH_TOKEN = localStorage.getItem("authToken");

const UserGroupsTable = () => {
  const userRoles = [
    "Admin",
    "Initiator",
    "Authorizer",
    "Reviewer",
    "Payment Initiator",
    "Final Payment Authorizer",
  ];

  const headers = ["Name", "Telephone", "Email", "Role", "Action"];
  const [rows, setRows] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from API on mount
  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setRows(data.data); // Assuming API returns { data: [] }
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Open modal for adding a new user
  const openModal = () => {
    setNewUser({
      name: "",
      email: "",
      phone_number: "",
      role: "",
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle input changes for new user form
  const handleInputChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  // Add new user to API
  const addNewUser = async () => {
    const { name, email, phone_number, role } = newUser;

    // Validation: Ensure all fields are filled
    if (!name || !email || !phone_number || !role) {
      alert("Please fill in all the fields.");
      return;
    }

    const newUserData = {
      name,
      email,
      phone_number,
      role,
      password: "password123", // Can be customized
      password_confirmation: "password123", // Can be customized
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(newUserData),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const savedUser = await response.json();
      setRows([...rows, savedUser.data]); // Add new user with generated ID
      closeModal(); // Close the modal after saving the user
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  // Remove user from API and table
  const removeRow = async (index) => {
    const userToDelete = rows[index];

    try {
      const response = await fetch(`${API_URL}/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${AUTH_TOKEN}`,
        },
      });

      const result = await response.json();
      if (result.status_code === "1000") {
        setRows(rows.filter((_, i) => i !== index)); // Remove from UI
      } else {
        throw new Error(`Delete failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="table-container">
        <h2 className="table-title">User Group</h2>
        <div  className="button-container">
          <button onClick={openModal} className="add-button">Add User</button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.phone_number}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>
                  <button onClick={() => removeRow(index)} className="remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Enter Name"
              value={newUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Telephone"
              value={newUser.phone_number}
              onChange={(e) => handleInputChange("phone_number", e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={newUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <select
              value={newUser.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
            >
              <option value="">Select Role</option>
              {userRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={addNewUser} className="save-button">Save</button>
              <button onClick={closeModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGroupsTable;
