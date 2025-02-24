import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "./Sidebar"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './admin.css';
const AdminDashboard = () => {
 
  const stats = {
    totalVouchers: 150,
    reviewedVouchers: 120,
    authorizedVouchers: 90,
    rejectedVouchers: 30,
    initiatedPayments: 80,
    totalSuppliers: 25,
  };

  const voucherData = [
    { name: "Reviewed", count: stats.reviewedVouchers },
    { name: "Authorized", count: stats.authorizedVouchers },
    { name: "Rejected", count: stats.rejectedVouchers },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Stats Summary */}
        <Grid container spacing={3}>
          {Object.entries(stats).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Paper sx={{ p: 3, textAlign: "center", backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{key.replace(/([A-Z])/g, ' $1')}</Typography>
                <Typography variant="h5">{value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Voucher Status Chart */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Voucher Status Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voucherData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
