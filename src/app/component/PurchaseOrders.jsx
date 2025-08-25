
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,TableHead,TableRow,Paper,IconButton,Modal,Divider,Button,} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const mockRequests = [
  {
    id: "PR-101",
    item: "Printer Paper",
    category: "Office Supplies",
    quantity: 50,
    supplier: "ABC Supplies",
    requestor: "John Doe",
    status: "Pending",
    unitCost: 120,
    deliveryDate: "2025-09-01",
  },
  {
    id: "PR-102",
    item: "Laptop",
    category: "Electronics",
    quantity: 5,
    supplier: "XYZ Tech",
    requestor: "Jane Smith",
    status: "Approved",
    unitCost: 75000,
    deliveryDate: "2025-09-10",
  },
];

export default function PurchaseOrders() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (req) => {
    setSelected(req);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">
        Purchase Requests
      </Typography>
       <Typography variant="body2" color="text.secondary">
       Manage purchase orders and approval workflow
      </Typography>

      <TableContainer component={Paper}  sx={{mt:5}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Requestor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.item}</TableCell>
                <TableCell>{req.category}</TableCell>
                <TableCell>{req.quantity}</TableCell>
                <TableCell>{req.supplier}</TableCell>
                <TableCell>{req.requestor}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpen(req)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton color="error">
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
              <Typography><b>Item:</b> {selected.item}</Typography>
              <Typography><b>Category:</b> {selected.category}</Typography>
              <Typography><b>Quantity:</b> {selected.quantity}</Typography>
              <Typography><b>Supplier:</b> {selected.supplier}</Typography>
              <Typography><b>Requestor:</b> {selected.requestor}</Typography>
              <Typography><b>Status:</b> {selected.status}</Typography>
              <Typography><b>Unit Cost:</b> ₹{selected.unitCost}</Typography>
              <Typography><b>Delivery Date:</b> {selected.deliveryDate}</Typography>
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>
                  Approve
                </Button>
                <Button variant="contained" color="error" startIcon={<CancelIcon />}>
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
}

