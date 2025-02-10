import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Sidebar from "./Sidebar";

const CreateSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    accounts: [""],
    products: [""],
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/suppliers/create", supplier)
      .then((result) => {
        if (result.data.Status) {
          alert("Supplier created successfully!");
          navigate("");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleDynamicChange = (index, type, value) => {
    const updatedList = [...supplier[type]];
    updatedList[index] = value;
    setSupplier({ ...supplier, [type]: updatedList });
  };

  const addField = (type) => {
    setSupplier({ ...supplier, [type]: [...supplier[type], ""] });
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="create-supplier-container">
        <div className="p-3 rounded w-50 borde">
          <h3 className="text-center">Create Supplier</h3>
          <form className="create-supplier-form" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label">Supplier Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Supplier Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter Phone Number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Accounts</label>
              {supplier.accounts.map((account, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Account ${index + 1}`}
                  value={account}
                  onChange={(e) => handleDynamicChange(index, "accounts", e.target.value)}
                  required
                />
              ))}
              <button type="button" className="btn btn-secondary mt-2" onClick={() => addField("accounts")}>
                Add Account
              </button>
            </div>
            <div className="col-12">
              <label className="form-label">Products</label>
              {supplier.products.map((product, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Product ${index + 1}`}
                  value={product}
                  onChange={(e) => handleDynamicChange(index, "products", e.target.value)}
                  required
                />
              ))}
              <button type="button" className="btn btn-secondary mt-2" onClick={() => addField("products")}>
                Add Product
              </button>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Submit Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSupplier;
