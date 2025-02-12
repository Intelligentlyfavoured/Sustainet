import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";

// Set the API endpoint for fetching authorized payment vouchers
const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/payment-vouchers/authorized";

// Base URL for accessing invoice PDF documents
const INVOICE_BASE_URL = "http://197.248.122.31/sustainet_voucher_api/public/invoices/";

// (Optional) If your API requires a token, uncomment and set it here:
// const token = "3|59kxMti9Edfh56Adps9Xp2uwHr7WWnKzDmnBikuy2021ffb0";

const PaymentInitiation = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status for review
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchVouchers();
  }, []);

  // GET: Fetch vouchers from the API
  const fetchVouchers = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          // If using a token, include:
          // "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      // The API returns data in the "data" property
      setVouchers(data.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      // Optionally, set dummy data if needed:
      // setVouchers([...]);
    }
  };

  // Open modal to review/update voucher status
  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setComment(voucher.comments || "");
    setStatus(voucher.status || "Pending");
  };

  // Close modal and reset modal fields
  const closeModal = () => {
    setSelectedVoucher(null);
    setComment("");
    setStatus("Pending");
  };

  // POST: Submit the review update
  const handleReviewSubmit = async () => {
    if (!selectedVoucher) return;

    // Build the payload. Note that here we use the voucher's "id" (the unique identifier)
    const payload = {
      id: selectedVoucher.id,                     // Unique voucher identifier from API
      invoice_id: selectedVoucher.invoice_id || 1,  // Default if missing; update as needed
      supplier_id: selectedVoucher.supplier_id || 3, // Default if missing; update as needed
      amount: parseFloat(selectedVoucher.amount) || 0,
      reviewer_id: selectedVoucher.reviewer_id || 1, // Default (update as needed)
      comments: comment,                           // Include comments if provided (or an empty string)
      status: status,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If using a token, include:
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status_code === "1000") {
        alert("Review submitted successfully!");
        await fetchVouchers();
        closeModal();
      } else {
        alert("Failed to submit review: " + result.message);
      }
    } catch (error) {
      console.error("Error updating voucher review:", error);
    }
  };

  // Filter vouchers based on any field's text (case-insensitive)
  const filteredVouchers = vouchers.filter((voucher) =>
    Object.values(voucher).some((value) =>
      value?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="reviewer-container">
      <Sidebar />
      <div className="reviewer-content">
        <h2>Payment Initiation</h2>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Filter..."
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-input"
          />
          <div className="notification-icon">
            <FaBell title="Notifications" size="1.5rem" />
            <span className="notif-count">{notifications}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="voucher-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Account No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan="6">No matching vouchers</td>
                </tr>
              ) : (
                filteredVouchers.map((voucher, index) => (
                  <tr key={voucher.id ? voucher.id : index}>
                    <td>{voucher.id}</td>
                    
                    <td>{voucher.amount ? `Ksh ${voucher.amount}` : "N/A"}</td>
                    <td>{voucher.account_no || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          voucher.status === "Authorized" ? "authorized" :
                          voucher.status === "Pending" ? "pending" : "rejected"
                        }`}
                      >
                        {voucher.status || "N/A"}
                      </span>
                    </td>
                    <td>
                      <button className="preview-btn" onClick={() => openModal(voucher)}>
                        Initiate Payment
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Popup for Reviewing a Voucher */}
        {selectedVoucher && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>X</button>
              <h3>Payment Initiation</h3>
              <p>
                <strong>Invoice:</strong> {selectedVoucher.pdf_path}
              </p>
              <p>
                <strong>Invoice ID:</strong> {selectedVoucher.invoice_id || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> {selectedVoucher.amount ? `Ksh ${selectedVoucher.amount}` : "N/A"}
              </p>
              <p>
                <strong>Account No:</strong> {selectedVoucher.account_no || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedVoucher.status || "N/A"}
              </p>
              <label style={{ marginBottom: "10px", display: "block" }}>
                <strong>Status:</strong>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ marginBottom: "15px", display: "block", width: "50%" }}
              >
                <option value="Pending">Pending</option>
                <option value="Authorized">Authorized</option>
                <option value="Rejected">Rejected</option>
              </select>
              {/* Comments field is optional */}
              <textarea
                placeholder="Add comments (optional)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ marginBottom: "15px", display: "block", width: "100%" }}
              />
              <button
                className="submit-btn"
                onClick={handleReviewSubmit}
                style={{ marginTop: "10px", width: "50%" }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInitiation;
