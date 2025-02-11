import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import "./style.css";
import Sidebar from "./Sidebar";

export default function CreateSupplier() {
  const [form, setForm] = useState({
    supplier_name: "",
    email: "",
    contact_number: "",
    address: "",
  });

  const token = "3|59kxMti9Edfh56Adps9Xp2uwHr7WWnKzDmnBikuy2021ffb0"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      supplier_name: form.supplier_name,
      email: form.email,
      contact_number: form.contact_number,
      address: form.address,
    };

    try {
      const response = await fetch(
        "http://197.248.122.31/sustainet_voucher_api/public/api/suppliers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify(supplierData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add supplier");
      }

      alert("Supplier added successfully!");
      console.log("Supplier Data:", data);

      
      setForm({
        supplier_name: "",
        email: "",
        contact_number: "",
        address: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding supplier: " + error.message);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" className="form-title">
          Supplier Information
        </Typography>

        <form onSubmit={handleSubmit} className="supplier-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Supplier Name"
                name="supplier_name"
                value={form.supplier_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Contact Number"
                name="contact_number"
                value={form.contact_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" mt={3}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              style={{ backgroundColor: "#32CD32" }}
            >
              Add Supplier
            </Button>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
