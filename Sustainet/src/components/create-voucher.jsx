import { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import Sidebar from "./Sidebar"; 
import "./style.css"; 

export default function CreateVoucher() {
  const [form, setForm] = useState({
    voucherName: "",
    amount: "",
    supplierName: "",
    account: "",
    enabled: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">Create Payment Voucher</Typography>
        <form onSubmit={handleSubmit} className="voucher-form">
          <TextField
            label="Voucher Name"
            name="voucherName"
            value={form.voucherName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Supplier Name"
            name="supplierName"
            value={form.supplierName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Supplier Account</InputLabel>
            <Select
              name="account"
              value={form.account}
              onChange={handleChange}
            >
              <MenuItem value="account1">Account 1</MenuItem>
              <MenuItem value="account2">Account 2</MenuItem>
              <MenuItem value="account3">Account 3</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControlLabel
            control={
              <Switch
                checked={form.enabled}
                onChange={handleChange}
                name="enabled"
              />
            }
            label="Enable Voucher"
          /> */}

<label className="file-label">
  Upload Invoice
 </label>
 
<input type="file" onChange={handleFileChange} className="file-input" />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Voucher
          </Button>
        </form>
      </Paper>
    </div>
  );
}

