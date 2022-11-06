import React from "react";
import PropTypes from "prop-types";
import styles from "./Homepage.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import Appointment from "../Appointment/Appointment";
import { Box } from "@mui/material";
import firebaseConfig from "../config/firebase";

function Homepage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  console.log(firebaseConfig);

  return (
    <Box className={styles.Homepage}>
      <Menubar />
      <Appointment />
      <Box>
        <h1>HOMEPAGE</h1>
        <Button variant="contained" onClick={goToLoginPage}>
          Go TO LOGIN PAGE
        </Button>
      </Box>
    </Box>
  );
}

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
