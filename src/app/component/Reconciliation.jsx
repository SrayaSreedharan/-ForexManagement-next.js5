"use client";

import { useEffect, useState } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
  
  Typography,} from "@mui/material";

export default function ReconciliationPage() {
  const [data, setData] = useState([]);

// ==========================================FETCH DATA================================================
  useEffect(() => {
    fetch("/api/reconcile/get")
      .then((res) => res.json())
      .then((rows) => setData(Array.isArray(rows) ? rows : []))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
     <Typography variant="h5" fontWeight="bold">
            Reconciliation
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Item Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Inventory Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Purchase Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Difference
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <TableRow key={i} hover>
                  <TableCell>{row.item_name ?? "-"}</TableCell>
                  <TableCell>{row.purchase_quantity ?? "-"}</TableCell>
                  <TableCell>
                    {row.inventory_price !== null
                      ? `₹${row.inventory_price}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {row.purchase_price !== null
                      ? `₹${row.purchase_price}`
                      : "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.purchase_price === row.inventory_price
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.price_difference !== null
                      ? `₹${row.price_difference}`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
