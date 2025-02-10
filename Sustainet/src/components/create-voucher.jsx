import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './createvoucher.css'
import Sidebar from "./Sidebar";
const CreateVoucher = () => {
  const [voucher, setVoucher] = useState({
    supplier_name: "",
    amount: "",
    account: "",
    invoice: null,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("supplier_name", voucher.supplier_name);
    formData.append("amount", voucher.amount);
    formData.append("account", voucher.account);
    formData.append("invoice", voucher.invoice);

    axios
      .post("http://localhost:3000/vouchers/create", formData)
      .then((result) => {
        if (result.data.Status) {
          alert("Voucher submitted successfully!");
          navigate("/dashboard/review"); // Route to reviewer
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (

    <div className="container">
      <Sidebar />
    
    <div className="create-voucher-container">
      <div className="p-3 rounded w-50 borde">
        <h3 className="text-center">Create Payment Voucher</h3>
        <form className="create-voucher-form" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Supplier Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Supplier Name"
              onChange={(e) =>
                setVoucher({ ...voucher, supplier_name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control rounded-0"
              placeholder="Enter Amount"
              onChange={(e) =>
                setVoucher({ ...voucher, amount: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Account</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Account Details"
              onChange={(e) =>
                setVoucher({ ...voucher, account: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Attach Invoice</label>
            <input
              type="file"
              className="form-control rounded-0"
              onChange={(e) =>
                setVoucher({ ...voucher, invoice: e.target.files[0] })
              }
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateVoucher;
