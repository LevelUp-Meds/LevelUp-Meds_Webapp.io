import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
      } else {
        navigate("/login");
      }
    });
  }, []);

  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {}
  };
  // const logout = () => {
  //   signOut(auth);
  // };

  return (
    <div className={styles.Dashboard}>
      <h1>LOGGED IN PAGE</h1>
      <p>User email: {user && user.email}</p>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
