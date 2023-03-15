import React from 'react'
import "./InboxPage.scss";
import Add from "./inboxAssets/addFriendIcon.png";
import More from "./inboxAssets/moreIcon.png";
import Messages from "./Messages"
import Input from "./Input"

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Edward</span>
                <div className='chatIcons'>
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;