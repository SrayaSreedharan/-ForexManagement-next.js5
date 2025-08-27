"use client";

import { useState, useEffect } from "react";
import {Box,Typography,Grid,Paper,Table,TableHead,TableRow,TableCell,TableBody,Chip,} from "@mui/material";

const StaffLanding = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/staffinventory/get");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching staff requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
// -----------------------colour mapping-------------------
  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return <Typography sx={{ mt: 4, ml: 4 }}>Loading requests...</Typography>;
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Staff Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your purchase requests and status updates
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "yellow",width:340 }}>
            <Typography variant="h6">Total Requests</Typography>
            <Typography variant="h4">{requests.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "green", color: "white",width:340 }}>
            <Typography variant="h6">Approved</Typography>
            <Typography variant="h4">
              {requests.filter((r) => r.status?.toLowerCase() === "approved").length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "orange", color: "white",width:340 }}>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">
              {requests.filter((r) => r.status?.toLowerCase() === "pending").length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "red", color: "white",width:340 }}>
            <Typography variant="h6">Rejected</Typography>
            <Typography variant="h4">
              {requests.filter((r) => r.status?.toLowerCase() === "rejected").length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.item}</TableCell>
                <TableCell>{req.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={req.status}
                    color={statusColor(req.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default StaffLanding;
