import React from 'react'
import Img from "./inboxAssets/imageIcon.png";
import Attach from "./inboxAssets/attachIcon.png";
const Input = () => {
    return (
        <div className='input'>
            <input type="text" placeholder='Type Message...' />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{display:"none"}} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;