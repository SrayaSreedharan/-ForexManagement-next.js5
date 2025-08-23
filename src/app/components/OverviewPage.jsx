"use client";
import React from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";

export default function OverviewPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total FX Purchases</Typography>
            <Typography variant="h4">$2.5M</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total FX Sales</Typography>
            <Typography variant="h4">$1.8M</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Net Position</Typography>
            <Typography variant="h4">+$700K</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
