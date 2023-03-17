import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Medication from "../../components/Medication/Medication";
import Menubar from "../../components/Menubar/Menubar";

export default function MedicationPage() {
  return (
    <Box>
      <Menubar></Menubar>
      <Medication></Medication>
    </Box>
  );
}
