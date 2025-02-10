import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./style.css";
import Sidebar from "./Sidebar"; 


export default function CreateSupplier() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    reason: "",
    accounts: [""], // Multiple accounts
    file: null,
    agreed: false
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "accounts" && index !== null) {
      const updatedAccounts = [...form.accounts];
      updatedAccounts[index] = value;
      setForm((prev) => ({ ...prev, accounts: updatedAccounts }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addAccountField = () => {
    setForm((prev) => ({ ...prev, accounts: [...prev.accounts, ""] }));
  };

  const removeAccountField = (index) => {
    const updatedAccounts = [...form.accounts];
    updatedAccounts.splice(index, 1);
    setForm((prev) => ({ ...prev, accounts: updatedAccounts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agreed) {
      alert("Please agree to the terms before proceeding.");
      return;
    }
    console.log("Supplier Data:", form);
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">
          Supplier Information
        </Typography>

        <form onSubmit={handleSubmit} className="supplier-form">
          <Grid container spacing={4}>
            {/* Left Column: Personal Details */}
            <Grid item xs={12} md={6} className="left-column">
              <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Company Name" name="company" value={form.company} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
              <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} className="file-input" />
            </Grid>

            {/* Right Column: Address & Accounts */}
            <Grid item xs={12} md={6} className="right-column">
              <TextField label="Street Address" name="streetAddress" value={form.streetAddress} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="State / Province / Region" name="state" value={form.state} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="ZIP / Postal Code" name="zip" value={form.zip} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Country" name="country" value={form.country} onChange={handleChange} fullWidth margin="normal" required />

              <Typography variant="subtitle1" className="account-title">Accounts</Typography>
              {form.accounts.map((account, index) => (
                <div key={index} className="account-field">
                  <TextField label={`Account ${index + 1}`} name="accounts" value={account} onChange={(e) => handleChange(e, index)} fullWidth margin="normal" />
                  <IconButton onClick={() => removeAccountField(index)} disabled={form.accounts.length === 1}>
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}
              <Button variant="outlined" startIcon={<AddIcon />} onClick={addAccountField} className="add-account-btn">
                Add Account
              </Button>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid container justifyContent="center" mt={3}>
            <Button type="submit" variant="contained"  fullWidth>
              Add Supplier
            </Button>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
