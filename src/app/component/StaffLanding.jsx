"use client";

import { useState } from "react";
import {Box,Typography,Grid,Paper,Table,TableHead,TableRow,TableCell,TableBody,Chip,Button,IconButton,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StaffLanding = () => {
    const mockRequests = [
  {
    id: "PR-201",
    item: "Printer Paper",
    quantity: 50,
    date: "2025-08-20",
    status: "Approved",
  },
  {
    id: "PR-202",
    item: "Laptop",
    quantity: 2,
    date: "2025-08-22",
    status: "Pending",
  },
  {
    id: "PR-203",
    item: "Markers",
    quantity: 20,
    date: "2025-08-23",
    status: "Rejected",
  },
];

  const [requests, setRequests] = useState(mockRequests);

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

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
        {/* <Button variant="contained" startIcon={<AddIcon />}>
          New Request
        </Button> */}
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, width: 470 }}>
            <Typography variant="h6">Total Requests</Typography>
            <Typography variant="h4">{requests.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, width: 470}}>
            <Typography variant="h6">Approved</Typography>
            <Typography variant="h4">
              {requests.filter((r) => r.status === "Approved").length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, width: 470 }}>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">
              {requests.filter((r) => r.status === "Pending").length}
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
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.item}</TableCell>
                <TableCell>{req.quantity}</TableCell>
                <TableCell>{req.date}</TableCell>
                <TableCell>
                  <Chip label={req.status} color={statusColor(req.status)} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
export default  StaffLanding
