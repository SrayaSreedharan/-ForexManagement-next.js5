"use client";

import { useState, useEffect } from "react";
import {Box,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Modal,Divider,Button,} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const PurchaseOrders = () => {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

// =======================================FETCH STAFF INVENTORY DATA===========================

  const fetchData = async () => {
    try {
      const res = await fetch("/api/staffinventory/get");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (req) => {
    setSelected(req);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };
// =========================================STAUS UPADTED=============================
  const handleStatusChange = async (id, status) => {
    const res = await fetch(`/api/staffinventory/status`, {
      method: "PUT",
      body: JSON.stringify({ id, status }),
    });

    if (res.ok) {
      fetchData(); 
    }
  };

  if (loading) return <Typography>Loading requests...</Typography>;

 return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">
        Purchase Requests
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Manage purchase orders and approval workflow
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>
            <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Requested ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Item
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Supplier
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.item}</TableCell>
                <TableCell>{req.category}</TableCell>
                <TableCell>{req.quantity}</TableCell>
                <TableCell>{req.price}</TableCell>
                <TableCell>{req.supplier}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpen(req)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleStatusChange(req.id, "Approved")}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleStatusChange(req.id, "Rejected")}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          {selected && (
            <>
              <Typography variant="h6" gutterBottom>
                Request Detail – {selected.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <b>Item:</b> {selected.item}
              </Typography>
              <Typography>
                <b>Category:</b> {selected.category}
              </Typography>
              <Typography>
                <b>Quantity:</b> {selected.quantity}
              </Typography>
              <Typography>
                <b>Price:</b> {selected.quantity}
              </Typography>
              <Typography>
                <b>Supplier:</b> {selected.supplier}
              </Typography>
              <Typography>
                <b>Requestor:</b> {selected.requestor}
              </Typography>
              <Typography>
                <b>Status:</b> {selected.status}
              </Typography>
              <Typography>
                <b>Unit Cost:</b> ₹{selected.unitCost}
              </Typography>
              <Typography>
                <b>Delivery Date:</b> {selected.deliveryDate}
              </Typography>
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleStatusChange(selected.id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => handleStatusChange(selected.id, "Rejected")}
                >
                  Reject
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PurchaseOrders;
