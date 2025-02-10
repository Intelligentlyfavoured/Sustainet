import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Sidebar from "./Sidebar"; 
import "./style.css"; 

export default function CreateSupplier() {
  const [form, setForm] = useState({
    supplierName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    accounts: [""], // Multiple accounts
    file: null
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "accounts" && index !== null) {
      const updatedAccounts = [...form.accounts];
      updatedAccounts[index] = value;
      setForm((prev) => ({
        ...prev,
        accounts: updatedAccounts
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const addAccountField = () => {
    setForm((prev) => ({
      ...prev,
      accounts: [...prev.accounts, ""]
    }));
  };

  const removeAccountField = (index) => {
    const updatedAccounts = [...form.accounts];
    updatedAccounts.splice(index, 1);
    setForm((prev) => ({
      ...prev,
      accounts: updatedAccounts
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Supplier Data:", form);
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">Create Supplier</Typography>
        <form onSubmit={handleSubmit} className="supplier-form">
          <TextField
            label="Supplier Name"
            name="supplierName"
            value={form.supplierName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Company Name"
            name="company"
            value={form.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Dynamic Account Fields */}
          <Typography variant="subtitle1" className="account-title">Accounts</Typography>
          {form.accounts.map((account, index) => (
            <div key={index} className="account-field">
              <TextField
                label={`Account ${index + 1}`}
                name="accounts"
                value={account}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => removeAccountField(index)} disabled={form.accounts.length === 1}>
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addAccountField}
            className="add-account-btn"
          >
            Add Account
          </Button>

          {/* File Upload */}
          <input type="file" onChange={handleFileChange} className="file-input" />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Supplier
          </Button>
        </form>
      </Paper>
    </div>
  );
}
