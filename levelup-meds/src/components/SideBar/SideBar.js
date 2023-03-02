import React from "react";
import ChatNav from "../Chat/ChatNav";
import Search from "../Search/Search";
import Chats from "../Chat/Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ChatNav />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
