import React from "react";
import { db } from "../firebase/config";
//import { AuthContext } from "../contexts/AuthProvider";
import "./Homepage.module.scss";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Grid,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    InputLabel,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import LevelUpShowcase from "../../assets/showcase.webp";
import LevelUpLargeLogo from "../../assets/levelupmeds_large_logo.webp";
import Menubar from "../Menubar/menubar"
import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Homepage.module.scss";
import Appointment from "../Appointment/Appointment";
import Medication from "../Medication/Medication";
import auth from "../Auth/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";

function Homepage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Box className={styles.Homepage}>
      <Menubar/>
      <Box>
        <h1>HOMEPAGE</h1>
        <Button variant="contained" onClick={goToLoginPage}>
          Go TO LOGIN PAGE
        </Button>
      </Box>
      <Appointment />
      <Medication/>
    </Box>
  );
}

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
