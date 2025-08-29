"use client";

import { useState, useEffect } from "react";
import {
  Box,Typography,Table,TableHead,TableBody,TableRow,TableCell,TableContainer,Paper,Button,TextField,Chip,} from "@mui/material";

export default function ReconciliationPage() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState({});

// =======================================GET DATA===============================
  const fetchReconciliations = async () => {
    try {
      const res = await fetch("/api/reconcile/get");
      const data = await res.json();
      setRecs(data.reconciliations || []);
    } catch (err) {
      console.error("Error fetching reconciliations:", err);
    }
  };

  useEffect(() => {
    fetchReconciliations();
  }, []);

  // =======================================INSERT================================================
  const handleReconcile = async (purchaseRequestId) => {
    try {
      setLoading(true);
      const res = await fetch("/api/reconcile/insert", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseRequestId,
          invoiceAmount: invoiceAmount[purchaseRequestId],
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
              <TableCell>Purchase Request</TableCell>
              <TableCell>Requested Qty</TableCell>
              <TableCell>Invoice Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reconcile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recs.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.purchase_requests?.item}</TableCell>
                <TableCell>{rec.requested_amount}</TableCell>
                <TableCell>₹{rec.invoice_amount}</TableCell>
                <TableCell>
                  <Chip
                    label={rec.status}
                    color={statusColor(rec.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="Enter invoice"
                    value={invoiceAmount[rec.purchase_requests?.id] || ""}
                    onChange={(e) =>
                      setInvoiceAmount((prev) => ({
                        ...prev,
                        [rec.purchase_requests?.id]: e.target.value,
                      }))
                    }
                    sx={{ mr: 1, width: 120 }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleReconcile(rec.purchase_requests?.id)}
                    disabled={loading}
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
