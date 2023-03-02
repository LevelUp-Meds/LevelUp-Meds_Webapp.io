import React, { useContext } from "react";
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import Messages from "../Message/Messages";
import Input from "../Input/Input";
import { ChatContext } from "../context/ChatContext";
import "./Chat.scss";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
