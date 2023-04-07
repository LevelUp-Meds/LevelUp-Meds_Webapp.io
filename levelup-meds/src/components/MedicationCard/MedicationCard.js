import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import "./MedicationCard.css";
import CancelIcon from "@mui/icons-material/Cancel";

export default function MedicationCard({ name, amount, frequency }) {
  return (
    <Box className="MedicationCardWrapper">
      <Box className="MedInfoWrapper">
        <Typography>
          {name} {amount} {frequency}
        </Typography>
      </Box>
      <Box className="CancelIconWrapper">
        <IconButton size="small">
          <CancelIcon style={{ color: "red" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
