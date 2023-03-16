import React from 'react'
import "./InboxPage.scss";
import Finder from './Finder';
import Search from './Search';
import Chats from './Chats'


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Finder></Finder>
            <Search/>
            <Chats/>
        </div>
    )
}

export default Sidebar