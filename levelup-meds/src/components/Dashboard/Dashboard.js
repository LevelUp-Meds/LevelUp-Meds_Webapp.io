import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { redirect, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import MenuAppBar from "../Menubar/MenuAppBar";
import { onAuthStateChanged } from "firebase/auth";
import { useSignup } from "../hooks/useSignup";

function Dashboard() {
  const { logout } = UserAuth();
  const { user } = useSignup();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const doAfter = async () => {
  //     handleUpdate();
  //   };
  //   doAfter();
  // }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     if (!user) {
  //       console.log("Edward");
  //       navigate("/login");
  //     } else {
  //     }
  //   });
  // }, []);

  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/login");
      if (!user) {
        <redirect to="/login"></redirect>;
      }
    } catch (e) {}
  };

  const handleUpdate = () => {
    const findUser = async () => {
      const docRef = doc(db, "Accounts", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("No Document Exists");
      }
    };
    findUser();
  };

  const handleClick = () => {
    handleUpdate();
  };

  // const logout = () => {
  //   signOut(auth);
  // };

  return (
    <div className={styles.Dashboard}>
      <MenuAppBar firstName={user.displayName}></MenuAppBar>
      <div className={styles.Body}>
        <h1>LOGGED IN PAGE</h1>
        <p>User email: {user && user.email}</p>
        {user && <p> Name: {user.displayName}</p>}
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="contained" onClick={handleClick}>
          Update User
        </Button>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
