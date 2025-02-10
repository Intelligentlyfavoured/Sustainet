import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";

const API_URL = "https://your-api-endpoint.com/vouchers";

const VoucherAuthorization = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchPendingVouchers();
  }, []);

  const fetchPendingVouchers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVouchers(data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);

      // // Dummy data for testing
      // setVouchers([
      //   {
      //     id: "VCH-001",
      //     supplier: "ABC Supplies Ltd",
      //     amount: "150,000",
      //     invoice: "INV-202501",
      //     email: "contact@abc.com",
      //     phone: "+254712345678",
      //     product: "Office Chairs",
      //     status: "Pending",
      //   },
      //   {
      //     id: "VCH-002",
      //     supplier: "XYZ Traders",
      //     amount: "75,000",
      //     invoice: "INV-202502",
      //     email: "support@xyz.com",
      //     phone: "+254798765432",
      //     product: "Laptops",
      //     status: "Pending",
      //   },
      //   {
      //     id: "VCH-003",
      //     supplier: "MNO Enterprises",
      //     amount: "200,000",
      //     invoice: "INV-202503",
      //     email: "sales@mno.com",
      //     phone: "+254701234567",
      //     product: "Printers",
      //     status: "Pending",
      //   },
      // ]);
    }
  };

  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setComment(voucher.comment || "");
    setStatus(voucher.status || "Pending");
  };

  const closeModal = () => {
    setSelectedVoucher(null);
    setComment("");
    setStatus("Pending");
  };

  const handleReviewSubmit = () => {
    // Update the status in the vouchers list
    const updatedVouchers = vouchers.map((v) =>
      v.id === selectedVoucher.id ? { ...v, status } : v
    );

    setVouchers(updatedVouchers);
    closeModal();
  };

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
                <th>Voucher</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Invoice</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product</th>
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
                filteredVouchers.map((voucher) => (
                  <tr key={voucher.id}>
                    <td>{voucher.id}</td>
                    <td>{voucher.supplier}</td>
                    <td>Ksh {voucher.amount}</td>
                    <td>{voucher.invoice}</td>
                    <td>{voucher.email}</td>
                    <td>{voucher.phone}</td>
                    <td>{voucher.product}</td>
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
                        {voucher.status}
                      </span>
                    </td>
                    <td>
                      <button className="preview-btn" onClick={() => openModal(voucher)}>
                      Authorize Voucher
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Popup */}
        {selectedVoucher && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                X
              </button>
              <h3>Authorize Voucher</h3>
              <p><strong>Supplier:</strong> {selectedVoucher.supplier}</p>
              <p><strong>Amount:</strong> Ksh {selectedVoucher.amount}</p>
              <p><strong>Invoice:</strong> {selectedVoucher.invoice}</p>
              <p><strong>Email:</strong> {selectedVoucher.email}</p>
              <p><strong>Phone:</strong> {selectedVoucher.phone}</p>
              <p><strong>Product:</strong> {selectedVoucher.product}</p>

              {/* Status Dropdown */}
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

                    {/* Comments */}
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
