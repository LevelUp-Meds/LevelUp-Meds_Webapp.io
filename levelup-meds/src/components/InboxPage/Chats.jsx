import React from 'react'

const Chats = () => {
    return (
        <div className="chats">
            <div className='userChat'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""></img>
                <div className='userChatInfo'>
                    <span>Pranov</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className='userChat'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""></img>
                <div className='userChatInfo'>
                    <span>Corey</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className='userChat'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""></img>
                <div className='userChatInfo'>
                    <span>Edward</span>
                    <p>Arron</p>
                </div>
            </div>
        </div>
    );
};

export default Chats;