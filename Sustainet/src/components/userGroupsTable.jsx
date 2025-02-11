import React, { useEffect, useState } from "react";
import "./UserGroupsTable.css"; // Import the CSS file
import Sidebar from "./Sidebar";

const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/users";
const AUTH_TOKEN = "3|59kxMti9Edfh56Adps9Xp2uwHr7WWnKzDmnBikuy2021ffb0";

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

  // Fetch users from API on mount
  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
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

  // Add new user to API
  const addRow = async () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      password_confirmation: "password123",
      role: "user",
      phone_number: "1234567890",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const savedUser = await response.json();
      setRows([...rows, savedUser.data]); // Add new user with generated ID
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  // Update user in API
  const handleInputChange = async (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const user = updatedRows[index];

    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: "newpassword",
          password_confirmation: "newpassword",
          role: user.role,
        }),
      });

      const result = await response.json();
      if (result.status_code !== "1000") {
        throw new Error(`Update failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
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
          Authorization: `Bearer ${AUTH_TOKEN}`,
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
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    placeholder="Enter Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.phone_number}
                    onChange={(e) => handleInputChange(index, "phone_number", e.target.value)}
                    placeholder="Enter Telephone"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => handleInputChange(index, "email", e.target.value)}
                    placeholder="Enter Email"
                  />
                </td>
                <td>
                  <select
                    value={row.role}
                    onChange={(e) => handleInputChange(index, "role", e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {userRoles.map((role, i) => (
                      <option key={i} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => removeRow(index)} className="remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addRow} className="add-button">Add User</button>
      </div>
    </div>
  );
};

export default UserGroupsTable;