import React from "react";
import "./InboxPage.css";
import { Box } from "@mui/material";
import Inbox from "../Inbox/Inbox";
import Menubar from "../Menubar/Menubar";

export default function InboxPage() {
  return (
    <Box className="InboxPageContainer">
      <Menubar></Menubar>
    </Box>
  );
}
