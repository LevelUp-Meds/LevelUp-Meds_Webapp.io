import React from "react";
import "./InboxPage.scss";
import { Box } from "@mui/material";
import Menubar from "../Menubar/Menubar";
import Sidebar from "../SideBar/SideBar";
import Chat from "../Chat/Chat";
import "../../styles.scss";

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
