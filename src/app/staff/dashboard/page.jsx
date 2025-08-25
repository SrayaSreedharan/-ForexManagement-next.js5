"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import StaffLanding from "@/app/component/StaffLanding";
import StaffInventory from "@/app/component/StaffInventory";
import StaffPurchaseOrders from "@/app/component/StaffPurchaseOrdes";
import StaffNavbar from "@/app/component/StaffNavbar";


const StaffPage = () => {
  const [activeContent, setActiveContent] = useState("dashboard");

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <StaffNavbar activeContent={activeContent} setActiveContent={setActiveContent} />
      
      <Box sx={{ mt: 2, px: 2 }}>
        {activeContent === "dashboard" && <StaffLanding/>}
        {activeContent === "inventory" && <StaffInventory/>}
        {activeContent === "purchaseOrders" && <StaffPurchaseOrders/>}
        {/* {activeContent === "reports" && <ReportsAnalytics />} */}
      </Box>
    </Box>
  );
};

export default StaffPage;
