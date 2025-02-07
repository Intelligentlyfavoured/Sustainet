import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import "./Reviewer.css"; // Import the CSS file
import { FaBell } from 'react-icons/fa';

function Reviewer() {
  const [role, setRole] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || { role: "Reviewer" };
    setRole(user.role);

    // Uncomment to fetch actual data
    /*
    fetch("https://your-api-endpoint.com/vouchers")
      .then(response => response.json())
      .then(data => {
        setVouchers(data);
        setNotifications(data.length); // Set notification count
      })
      .catch(error => console.error("Error fetching data:", error));
    */

    // START TEST DATA (Comment out for real API)
    
    const dummyVouchers = [
      { id: 1, supplier: "ABC Supplies", amount: 12000, account: "123456789", status: "not_reviewed", document: "voucher1.pdf" },
      { id: 2, supplier: "XYZ Traders", amount: 18000, account: "987654321", status: "approved", document: "voucher2.jpg" },
      { id: 3, supplier: "LMN Enterprises", amount: 7500, account: "567890123", status: "cancelled", document: "voucher3.png" },
      { id: 4, supplier: "PQR Logistics", amount: 22000, account: "432109876", status: "not_reviewed", document: "voucher4.pdf" },
    ];
    setVouchers(dummyVouchers);
    setNotifications(dummyVouchers.length);
    
    // END TEST DATA
  }, []);

  // Polling for new data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Uncomment for real API polling
      /*
      fetch("https://your-api-endpoint.com/vouchers")
        .then(response => response.json())
        .then(data => {
          setVouchers(data);
          setNotifications(data.length); // Update notification count
        })
        .catch(error => console.error("Error fetching data:", error));
      */
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Function to mark notifications as read
  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="main-content">
        <div className="header">
          <h2>Welcome, {role}</h2>

          {/* Notification Icon */}
          <div className="notification-icon" onClick={clearNotifications}>
            <FaBell style={{float:"right"}}></FaBell>
            {notifications > 0 && <span className="notification-count">{notifications}</span>}
          </div>
        </div>

        <div className="table-container">
          <h3>Vouchers Review</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Supplier Name</th>
                <th>Amount</th>
                <th>Account</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.length > 0 ? (
                vouchers.map((voucher) => (
                  <tr key={voucher.id} className={voucher.status}>
                    <td>
                      {voucher.document.endsWith(".pdf") ? (
                        <a href={`/documents/${voucher.document}`} target="_blank" rel="noopener noreferrer" className="doc-link">
                          View PDF
                        </a>
                      ) : (
                        <img src={`/documents/${voucher.document}`} alt="Voucher" className="voucher-image" />
                      )}
                    </td>
                    <td>{voucher.supplier}</td>
                    <td>Ksh {voucher.amount}</td>
                    <td>{voucher.account}</td>
                    <td className="status-text">{voucher.status.replace('_', ' ').toUpperCase()}</td>
                    <td>
                      {voucher.status === "not_reviewed" && (
                        <>
                          <button onClick={() => handleApprove(voucher.id)} className="approve-btn">
                            Approve
                          </button>
                          <button onClick={() => handleCancel(voucher.id)} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No vouchers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reviewer;
