"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  TableContainer,
} from "@mui/material";

const StaffPurchaseOrders = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests from backend
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

  if (loading) {
    return (
      <Typography sx={{ mt: 4, ml: 4 }}>Loading requests...</Typography>
    );
  }

  return (
    <Box sx={{ mt: 4, ml: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Purchase Requests
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Track your purchase requests and their approval status
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.item}</TableCell>
                <TableCell>{req.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={req.status}
                    sx={{
                      bgcolor:
                        req.status === "Approved"
                          ? "green"
                          : req.status === "Rejected"
                          ? "red"
                          : "gray",
                      color: "white",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffPurchaseOrders;
