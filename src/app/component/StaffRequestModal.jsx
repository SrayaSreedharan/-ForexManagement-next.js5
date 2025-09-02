"use client";

import { useState, useEffect } from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,TextField,Button,} from "@mui/material";

const StaffRequestModal = ({ open, onClose, item }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) {
      setQuantity(0);
      setPrice(0);
      setReason("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!item?.name || !item?.category || !item?.supplier || quantity <= 0 || price <= 0) {
      alert("Please enter valid details (Quantity & Price must be greater than 0).");
      return;
    }

    try {
      const res = await fetch("/api/staffinventory/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: item.name,
          category: item.category,
          supplier: item.supplier,
          quantity,
          price,
          reason,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Purchase request submitted successfully!");
        onClose();
      } else {
        alert("Failed to submit request: " + data.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Purchase Request</DialogTitle>
      <DialogContent>
        <Typography mb={1}>
          <b>Item:</b> {item?.name}
        </Typography>
        <Typography mb={1}>
          <b>Category:</b> {item?.category}
        </Typography>
        <Typography mb={2}>
          <b>Supplier:</b> {item?.supplier}
        </Typography>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <TextField
          label="Price per unit"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <TextField
          label="Reason"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffRequestModal;
