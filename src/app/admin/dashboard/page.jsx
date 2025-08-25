"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Landing from "@/app/component/Landing";
import Navbar from "@/app/component/Navbar";
import Inventory from "@/app/component/Inventory";
import PurchaseOrders from "@/app/component/PurchaseOrders";
import ReportsAnalytics from "@/app/component/ReportsAnalytics";
import Reconciliation from "@/app/component/Reconciliation";


const Page = () => {
  const [activeContent, setActiveContent] = useState("dashboard");

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Navbar activeContent={activeContent} setActiveContent={setActiveContent} />

      <Box sx={{ mt: 2, px: 2 }}>
        {activeContent === "dashboard" && <Landing/>}
        {activeContent === "inventory" && <Inventory/>}
        {activeContent === "purchaseOrders" && <PurchaseOrders />}
        {activeContent === "reports" && <ReportsAnalytics/>}
        {activeContent === "reconciliation" && <Reconciliation/>}
        {/* {activeContent === "admin" && <Admin />} */}
      </Box>
    </Box>
  );
}
export default Page
