import React, { useState } from 'react';
import { useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import { AuthContext } from '../context/AuthContext';

const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(
            collection(db, "Profiles"),
            where("displayName", "==", username)
        );

        try{

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data())
        });
        }catch(err){
            setErr(true)
        }
    };

    const handleKey = e=> {
        e.code === "Enter" && handleSearch()
    };

    const handleSelect = async () => {
        //check exist,if not create new one
        const combinedId = currentUser.uid > user.uid 
            ? currentUser.uid + user.uid 
            : user.uid + currentUser.uid

        try {
            const res = await getDocs(doc(db,"chats", combinedId));
            if(!res.exists()){
                await setDoc(doc,(db,"chats", combinedId), { messages: [] });

                //create user chat
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"]: {
                    uid:user.uid,
                    diplayName: user.diplayName
                    },
                    [combinedId+".date"] : serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId+".userInfo"]: {
                    uid:currentUser.uid,
                    diplayName: user.diplayName
                    },
                    [combinedId+".date"] : serverTimestamp()
                }); 
            }
        } catch(err) {}

        setUser(null);
        setUsername("");
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Find User' 
                onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}
                 value={username}/>
            </div>
            {err && <span>User not found!</span>}
            {user && <div className='userChat' onClick={handleSelect}>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""></img>
                <div className='userChatInfo'>
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search