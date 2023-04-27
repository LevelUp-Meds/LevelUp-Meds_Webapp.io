import { doc, onSnapshot, getDocs, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import db from "../database/FirestoreConfig";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user } = UserAuth();
  const [users, setUsers] = useState([]);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats({ ...chats, [doc.id]: doc.data() });
      });

      return () => {
        unsub();
      };
    };

    const fetchAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "Profiles"));
      querySnapshot.forEach((doc) => {
        if (doc.data().displayName !== undefined) {
          users.push(doc.data().displayName);
        }
      });
      setUsers(users);
    };
    user.uid && getChats();
    fetchAllUsers();
  }, [user.uid]);

  const handleSelect = (u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      <div>
        {users.map((u) => {
          return <div className="userChat">{u}</div>;
        })}
      </div>
    </div>
  );
};

export default Chats;
