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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // alert(token)
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/suppliers`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Raw API Response:", text);

        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);

        if (Array.isArray(data)) {
          setSuppliers(data.data);
        } else if (data.data && Array.isArray(data.data)) {
          setSuppliers(data.data);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      invoice_pdf: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("invoice_id", form.invoice_id);
    formData.append("supplier_id", form.supplier_id);
    formData.append("amount", form.amount);
    formData.append("account_code", form.account_code);
    formData.append("created_by", form.created_by);
    if (form.invoice_pdf) {
      formData.append("invoice_pdf", form.invoice_pdf);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/payment-vouchers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await response.text();
      console.log("Raw API Response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(text);
      console.log("Parsed JSON:", data);

      if (data.status_code === "1000") {
        alert("Voucher created successfully!");
        setForm({
          invoice_id: "",
          supplier_id: "",
          amount: "",
          account_code: "",
          created_by: "1",
          invoice_pdf: null,
        });
      } else {
        throw new Error(data.message || "Failed to create voucher");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">
          Create Payment Voucher
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit} className="voucher-form">
          <TextField
            label="Invoice ID"
            name="invoice_id"
            value={form.invoice_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Supplier</InputLabel>
            <Select
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              required
            >
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

          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Account Code"
            name="account_code"
            value={form.account_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <label className="file-label">Upload Invoice</label>
          <input type="file" onChange={handleFileChange} className="file-input" />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#32CD32", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Voucher"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
