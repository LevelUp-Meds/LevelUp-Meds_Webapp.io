import React from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <div className={styles.Dashboard}>
      <h1>LOGGED IN PAGE</h1>
      <Button variant="contained" onClick={goToHomePage}>
        Logout
      </Button>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
