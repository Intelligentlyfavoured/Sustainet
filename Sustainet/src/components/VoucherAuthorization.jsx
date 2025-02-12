import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";

// Real API endpoint for fetching and updating vouchers
const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/payment-vouchers/reviewed-authorized";

// Base URL for accessing invoice PDF documents (if used)
const INVOICE_BASE_URL = "http://197.248.122.31/sustainet_voucher_api/public/invoices/";

// For this example, we're not using a token (or you can uncomment and use one)
// const token = "3|59kxMti9Edfh56Adps9Xp2uwHr7WWnKzDmnBikuy2021ffb0";

const VoucherAuthorization = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status for review
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchPendingVouchers();
  }, []);

  // GET: Fetch vouchers from the API
  const fetchPendingVouchers = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          // Uncomment the following if you need to send a token:
          // "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      // The API response is assumed to have a 'data' property that holds the voucher array
      setVouchers(data.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      // Optionally, set dummy data here if desired:
      // setVouchers([...]);
    }
  };

  // Open the modal to review a voucher
  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setComment(voucher.comment || "");
    setStatus(voucher.status || "Pending");
  };

  // Close the modal and reset fields
  const closeModal = () => {
    setSelectedVoucher(null);
    setComment("");
    setStatus("Pending");
  };

  // POST: Submit the review update to the API
  const handleReviewSubmit = async () => {
    if (!selectedVoucher) return;

    // Build payload based on the endpoint's expected body:
    // {
    //    "voucher_id": 5,          
    //    "supplier_id": 3,         
    //    "invoice_id": 1,          
    //    "amount": 20000.00,         
    //    "reviewer_id": 1,         
    //    "approver_id": 1,        
    //    "comments": "Approved",    
    //    "status": "Reviewed"       
    // }
    const payload = {
      // Use voucher_id from the fetched data; if null, you may need a fallback (here, we use 0)
      voucher_id: selectedVoucher.voucher_id || selectedVoucher.id || 0,
      supplier_id: selectedVoucher.supplier_id || 3,    // default (update as needed)
      invoice_id: selectedVoucher.invoice_id || 1,      // default (update as needed)
      amount: parseFloat(selectedVoucher.amount) || 0,
      reviewer_id: selectedVoucher.reviewer_id || 1,    // default (update as needed)
      approver_id: selectedVoucher.approver_id || 1,    // default (update as needed)
      comments: comment,
      status: status,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Uncomment the following if you need to send a token:
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status_code === "1000") {
        alert("Authorization submitted successfully!");
        // Refresh vouchers list and close modal
        await fetchPendingVouchers();
        closeModal();
      } else {
        throw new Error(result.message || "Failed to submit Authorization");
      }
    } catch (error) {
      console.error("Error updating voucher authorization:", error);
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
        <h2>Voucher Authorization</h2>
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
                <th>Account  Number</th>
                <th>Supplier Name</th>
                <th>Amount</th>
                <th>Created By</th>
                {/* <th>Email</th>
                <th>Phone</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan="9">No matching vouchers</td>
                </tr>
              ) : (
                filteredVouchers.map((voucher, index) => (
                  <tr key={voucher.id ? voucher.id : index}>
                    <td>{voucher.account_no}</td>
                    <td>{voucher.supplier_name}</td>
                    <td>{voucher.amount ? `Ksh ${voucher.amount}` : "N/A"}</td>
                    <td>{voucher.created_by || "N/A"}</td>
                    {/* <td>{voucher.email || "N/A"}</td>
                    <td>{voucher.phone || "N/A"}</td> */}
                    <td>
                      <span
                        className={`status-badge ${
                          voucher.status === "Pending"
                            ? "pending"
                            : voucher.status === "Authorized"
                            ? "Authorized"
                            : "rejected"
                        }`}
                      >
                        {voucher.status || "N/A"}
                      </span>
                    </td>
                    <td>
                      <button className="preview-btn" onClick={() => openModal(voucher)}>
                        Authorize
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
              <h3>Voucher Authorization</h3>
              <p>
                <strong>Voucher Name:</strong> {selectedVoucher.voucher_name || "N/A"}
              </p>
              <p>
                <strong>Supplier Name:</strong> {selectedVoucher.supplier_name || "N/A"}
              </p>
              <p>
                <strong>Created By:</strong> {selectedVoucher.created_by || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> {selectedVoucher.amount ? `Ksh ${selectedVoucher.amount}` : "N/A"}
              </p>
              <p>
                <strong>Invoice:</strong>{" "}
                {selectedVoucher.invoice ? (
                  <a
                    href={`${INVOICE_BASE_URL}${selectedVoucher.pdf_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedVoucher.invoice}
                  </a>
                ) : (
                  "N/A"
                )}
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
                <option value="Reviewed">Reviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
              {/* You can include a comment field if desired; here it's kept */}
              <textarea
                placeholder="Add comments..."
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

export default VoucherAuthorization;
