import React from "react";
import "./InboxPage.css";
import { Box } from "@mui/material";
import Inbox from "../Inbox/Inbox";

export default function InboxPage() {
  return (
    <Box className="InboxPageContainer">
      <Inbox></Inbox>
    </Box>
  );
}
