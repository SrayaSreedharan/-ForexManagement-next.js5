"use client";

import { useState, useEffect } from "react";
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
  Button,
  TextField,
  Chip,
} from "@mui/material";

export default function ReconciliationPage() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState({});

  // ======================================= GET DATA ===============================
  const fetchReconciliations = async () => {
    try {
      const res = await fetch("/api/staffinventory/get");
      const data = await res.json();
      console.log("Fetched data:", data.reconciliations);
      setRecs(data.reconciliations || []);
    } catch (err) {
      console.error("Error fetching reconciliations:", err);
    }
  };

  useEffect(() => {
    fetchReconciliations();
  }, []);

  // ======================================= INSERT / RECONCILE ===============================
  const handleReconcile = async (purchaseRequestId) => {
    const amount = parseFloat(invoiceAmount[purchaseRequestId]);
    if (isNaN(amount)) return;

    try {
      setLoading(true);
      const res = await fetch("/api/reconcile/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseRequestId,
          invoiceAmount: amount,
          reconciledBy: "Admin",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await fetchReconciliations();
      setInvoiceAmount((prev) => ({ ...prev, [purchaseRequestId]: "" }));
    } catch (err) {
      console.error("Reconcile failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ======================================= STATUS COLORS ===============================
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
        Reconciliations
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Requested Total</TableCell>
              <TableCell>Invoice Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reconcile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recs.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.purchase_requests?.item}</TableCell>
                <TableCell>{rec.purchase_requests?.quantity}</TableCell>
                <TableCell>₹{rec.purchase_requests?.price}</TableCell>
                <TableCell>₹{rec.requested_amount}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="Enter invoice"
                    value={invoiceAmount[rec.purchase_requests?.id] || rec.invoice_amount || ""}
                    onChange={(e) =>
                      setInvoiceAmount((prev) => ({
                        ...prev,
                        [rec.purchase_requests?.id]: e.target.value,
                      }))
                    }
                    sx={{ width: 120 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={rec.status}
                    color={statusColor(rec.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleReconcile(rec.purchase_requests?.id)}
                    disabled={loading || !invoiceAmount[rec.purchase_requests?.id]}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
