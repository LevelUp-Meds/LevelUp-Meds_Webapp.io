import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
      } else {
      }
    });
  }, []);

  const goToHomePage = () => {
    navigate("/");
  };

  const logout = () => {
    signOut(auth);
    onAuthStateChanged(auth, (data) => {
      if (!data) {
        goToHomePage();
      } else {
      }
    });
  };

  return (
    <div className={styles.Dashboard}>
      <h1>LOGGED IN PAGE</h1>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
