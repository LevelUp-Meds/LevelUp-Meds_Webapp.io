import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.scss";
import { redirect, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import auth from "../Auth/AuthProvider";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { user, UserAuth } from "../context/AuthContext";

function Dashboard() {
  let [name, setName] = useState("");
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setName(user.displayName);
  // }, [user.displayName]);

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
    console.log(user);
  };

  // const logout = () => {
  //   signOut(auth);
  // };

  return (
    <div className={styles.Dashboard}>
      <h1>LOGGED IN PAGE</h1>
      <p>User email: {user && user.email}</p>
      <p>Name: {user.displayName}</p>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="contained" onClick={handleUpdate}>
        Update User
      </Button>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
