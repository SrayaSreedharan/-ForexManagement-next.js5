"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Chip,
  Modal,
  Divider,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const mockReconciliations = [
  {
    id: "REC-201",
    purchaseId: "PR-101",
    item: "Printer Paper",
    supplier: "ABC Supplies",
    requestedAmount: 6000,
    invoiceAmount: 6000,
    status: "Matched",
    reconciledBy: "Admin John",
    date: "2025-08-22",
  },
  {
    id: "REC-202",
    purchaseId: "PR-102",
    item: "Laptop",
    supplier: "XYZ Tech",
    requestedAmount: 375000,
    invoiceAmount: 380000,
    status: "Mismatch",
    reconciledBy: "Admin Jane",
    date: "2025-08-23",
  },
];

export default function Reconciliation() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (rec) => {
    setSelected(rec);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const handleStatusChange = (recId, newStatus) => {
    console.log(`Reconciliation ${recId} marked as: ${newStatus}`);
    setSelected((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  const statusColor = (status) => {
    switch (status) {
      case "Matched":
        return "success";
      case "Mismatch":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Reconciliation
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reconciliation ID</TableCell>
              <TableCell>Purchase ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Requested (₹)</TableCell>
              <TableCell>Invoice (₹)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reconciled By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockReconciliations.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.id}</TableCell>
                <TableCell>{rec.purchaseId}</TableCell>
                <TableCell>{rec.item}</TableCell>
                <TableCell>{rec.supplier}</TableCell>
                <TableCell>₹{rec.requestedAmount}</TableCell>
                <TableCell>₹{rec.invoiceAmount}</TableCell>
                <TableCell>
                  <Chip
                    label={rec.status}
                    color={statusColor(rec.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{rec.reconciledBy}</TableCell>
                <TableCell>{rec.date}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(rec)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleStatusChange(rec.id, "Matched")}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleStatusChange(rec.id, "Mismatch")}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
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
                Reconciliation Detail – {selected.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography><b>Purchase ID:</b> {selected.purchaseId}</Typography>
              <Typography><b>Item:</b> {selected.item}</Typography>
              <Typography><b>Supplier:</b> {selected.supplier}</Typography>
              <Typography><b>Requested Amount:</b> ₹{selected.requestedAmount}</Typography>
              <Typography><b>Invoice Amount:</b> ₹{selected.invoiceAmount}</Typography>
              <Typography><b>Status:</b> {selected.status}</Typography>
              <Typography><b>Reconciled By:</b> {selected.reconciledBy}</Typography>
              <Typography><b>Date:</b> {selected.date}</Typography>

              <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleStatusChange(selected.id, "Matched")}
                >
                  Mark Matched
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => handleStatusChange(selected.id, "Mismatch")}
                >
                  Mark Mismatch
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
