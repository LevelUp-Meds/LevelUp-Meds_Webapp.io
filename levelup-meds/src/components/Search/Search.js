import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import db from "../database/FirestoreConfig";
import { AuthContext } from "../context/AuthContext";
import { UserAuth } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [err, setErr] = useState(false);

  const { user } = UserAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "Profiles"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCurrentUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats
        await setDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
      }
    } catch (error) {}

    // setCurrentUser(null);
    // setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {currentUser && (
        <div className="userChat" onClick={handleSelect}>
          {/* <img src={currentUser.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{currentUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
