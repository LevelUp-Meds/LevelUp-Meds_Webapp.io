import React from "react";
import "./InboxPage.scss";
import { Box } from "@mui/material";
import Sidebar from './Sidebar';
import Chat from './Chat';
import Menubar from "../Menubar/Menubar";

function InboxPage() {
  return (
    <Box>
      <Menubar></Menubar>
    <div className="home">
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
    </Box>
  );
}

export default InboxPage
