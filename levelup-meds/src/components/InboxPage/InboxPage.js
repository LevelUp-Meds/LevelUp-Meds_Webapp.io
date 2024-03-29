import React from "react";
import "./InboxPage.scss";
import { Box } from "@mui/material";
import Menubar from "../Menubar/Menubar";
import Sidebar from "../SideBar/SideBar";
import Chat from "../Chat/Chat";
import "../../styles.scss";

export default function InboxPage() {
  return (
    <div>
      <Menubar></Menubar>
      <div className="home">
        <div className="container">
          <Sidebar></Sidebar>
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}
