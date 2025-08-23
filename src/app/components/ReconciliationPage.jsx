"use client";
import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function ReconciliationPage() {
    const rows = [
        { id: 1, ref: "FX001", status: "Matched", systemAmt: 500000, bankAmt: 500000 },
        { id: 2, ref: "FX002", status: "Unmatched", systemAmt: 300000, bankAmt: 310000 },
        { id: 3, ref: "FX003", status: "Pending", systemAmt: 1200000, bankAmt: null },
    ];

    const columns = [
        { field: "ref", headerName: "Ref ID", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "systemAmt", headerName: "System Amount", flex: 1 },
        { field: "bankAmt", headerName: "Bank Amount", flex: 1 },
    ];

return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Reconciliation</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </CardContent>
    </Card>
  );
}
