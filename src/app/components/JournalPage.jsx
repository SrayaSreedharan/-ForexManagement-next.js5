"use client";
import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function JournalPage() {

    const rows = [
    { id: 1, ref: "FX001", type: "Purchase", currency: "USD", amount: 500000, counterparty: "HSBC", date: "2025-08-01" },
    { id: 2, ref: "FX002", type: "Sale", currency: "EUR", amount: 300000, counterparty: "Citi", date: "2025-08-05" },
    { id: 3, ref: "FX003", type: "Transfer", currency: "JPY", amount: 1200000, counterparty: "JP Morgan", date: "2025-08-10" },
    ];

    const columns = [
    { field: "ref", headerName: "Ref ID", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "currency", headerName: "Currency", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "counterparty", headerName: "Counterparty", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    ];

return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Transaction Journal</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </CardContent>
    </Card>
  );
}
