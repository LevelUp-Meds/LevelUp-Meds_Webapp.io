import React from 'react'
import Img from './inboxAssets/refreshIcon.png';

const Finder = () => {
    return (
        <div className='finder'>
            <span className='logo'>Inbox</span>
            <div className='user'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                <span>User</span>
                <button>
                    <img src={Img} alt='' />
                </button>
            </div>
        </div>
    )
}

export default Finder