import React from "react";
import PropTypes from "prop-types";
import styles from "./Homepage.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className={styles.Homepage}>
      <h1>HOMEPAGE</h1>
      <Button variant="contained" onClick={goToLoginPage}>
        Go TO LOGIN PAGE
      </Button>
    </div>
  );
}

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
