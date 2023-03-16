import React from 'react'

const Message = () => {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                alt=""></img>
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                alt="" />
            </div>
        </div>
    )
}

export default Message;