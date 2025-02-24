import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./style.css";

const API_BASE_URL = "http://197.248.122.31/sustainet_voucher_api/public/api";

export default function CreateVoucher() {
  const token = localStorage.getItem("authToken");

  const [form, setForm] = useState({
    invoice_id: "",
    supplier_id: "",
    amount: "",
    account_code: "",
    created_by: "1",
    invoice_pdf: null,
  });

  const [suppliers, setSuppliers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/suppliers`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
    
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
          const data = await response.json();
    
          if (Array.isArray(data.data)) {
            setSuppliers(data.data); 
            setAccounts(data.data.map((item) => ({
              account_no: item.account_no,
              account_name: item.account_name
            }))); 
          } else {
            throw new Error("Unexpected API response format");
          }
        } catch (err) {
          console.error("Error fetching suppliers and accounts:", err);
          setSuppliers([]);
          setAccounts([]);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [token]);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, invoice_pdf: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      alert('noma')
      const response = await fetch(`http://197.248.122.31/sustainet_voucher_api/public/api/payment-vouchers`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (data.status_code === "1000") {
        alert("Voucher created successfully!");
        setForm({ invoice_id: "", supplier_id: "", amount: "", account_code: "", created_by: "1", invoice_pdf: null });
      } else {
        throw new Error(data.message || "Failed to create voucher");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">Create Payment Voucher</Typography>
        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit} className="voucher-form">
          <TextField label="Invoice ID" name="invoice_id" value={form.invoice_id} onChange={handleChange} fullWidth margin="normal" required />

          <FormControl fullWidth margin="normal">
  <InputLabel>Supplier</InputLabel>
  <Select name="supplier_id" value={form.supplier_id || ""} onChange={handleChange} required>
    {loading ? (
      <MenuItem disabled>Loading suppliers...</MenuItem>
    ) : suppliers.length > 0 ? (
      suppliers.map((supplier) => (
        <MenuItem key={supplier.supplier_id} value={supplier.supplier_id}>
          {supplier.supplier_name}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>No suppliers available</MenuItem>
    )}
  </Select>
</FormControl>

<FormControl fullWidth margin="normal">
  <InputLabel>Account Number</InputLabel>
  <Select name="account_code" value={form.account_code || ""} onChange={handleChange} required>
    {loading ? (
      <MenuItem disabled>Loading accounts...</MenuItem>
    ) : accounts.length > 0 ? (
      accounts.map((account) => (
        <MenuItem key={account.account_no} value={account.account_no}>
          {account.account_no} - {account.account_name}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>No accounts available</MenuItem>
    )}
  </Select>
</FormControl>



          <TextField label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} fullWidth margin="normal" required />

          <label className="file-label">Upload Invoice</label>
          <input type="file" onChange={handleFileChange} className="file-input" />

          <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: "#32CD32", marginTop: "10px" }} disabled={loading}>
            {loading ? "Saving..." : "Save Voucher"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
