import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { FaBell } from "react-icons/fa";

const API_URL = "https://your-api-endpoint.com/vouchers";

const PaymentAuthorization = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [comment, setComment] = useState("");
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

      // Dummy data for testing
      setVouchers([
        {
          id: "VCH-001",
          supplier: "ABC Supplies Ltd",
          amount: "150,000",
          date: "2025-02-08",
          status: "Pending",
          document: "https://example.com/docs/voucher1.pdf",
          comment: "",
        },
        {
          id: "VCH-002",
          supplier: "XYZ Traders",
          amount: "75,000",
          date: "2025-02-07",
          status: "Approved",
          document: "https://example.com/docs/voucher2.pdf",
          comment: "Looks good.",
        },
        {
          id: "VCH-003",
          supplier: "MNO Enterprises",
          amount: "200,000",
          date: "2025-02-06",
          status: "Rejected",
          document: null,
          comment: "Incorrect amount.",
        },
      ]);
    }
  };

  const updateVoucherStatus = async (voucherId, status) => {
    try {
      await fetch(`${API_URL}/${voucherId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, comment }),
      });

      setVouchers(
        vouchers.map((v) =>
          v.id === voucherId ? { ...v, status, comment } : v
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating voucher:", error);
    }
  };

  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setComment(voucher.comment || "");
  };

  const closeModal = () => {
    setSelectedVoucher(null);
    setComment("");
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
      <h2>Payment Authorization</h2>
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
        <div className="voucher-table">
          <table>
            <thead>
              <tr>
                <th>Voucher ID</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Date</th>
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
                filteredVouchers.map((voucher) => (
                  <tr key={voucher.id} className={voucher.status.toLowerCase()}>
                    <td>{voucher.id}</td>
                    <td>{voucher.supplier}</td>
                    <td>Ksh {voucher.amount}</td>
                    <td>{voucher.date}</td>
                    <td className={`status-${voucher.status.toLowerCase()}`}>
                      {voucher.status}
                    </td>
                    <td>
                      <button className="preview-btn" onClick={() => openModal(voucher)}>
                        Authorize payment
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentAuthorization;
