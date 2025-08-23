"use client";
import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, report: "Daily FX Summary", created: "2025-08-20", status: "Generated" },
  { id: 2, report: "Weekly Reconciliation", created: "2025-08-18", status: "Generated" },
  { id: 3, report: "Monthly P&L", created: "2025-07-31", status: "Scheduled" },
];

const columns = [
  { field: "report", headerName: "Report Name", flex: 1 },
  { field: "created", headerName: "Created On", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

export default function ReportsPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Reports</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </CardContent>
    </Card>
  );
}
