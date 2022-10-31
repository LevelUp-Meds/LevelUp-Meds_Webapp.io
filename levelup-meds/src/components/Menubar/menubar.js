import React from "react";
import PropTypes from "prop-types";
import styles from "./menubar.module.scss";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    InputLabel,
    Button,
  } from "@mui/material";
  import Person from "@mui/icons-material/Person";
  
import LUMLogo from "../../assets/Logo_Orange.svg";

const menubar = () => (
  <Box sx={{ bgcolor: "#f6e188"}}>
    <AppBar sx={{bgcolor: "transparent", color:"black"}} position="static">
        <Toolbar>
            <Box sx={{mr: 'auto'}}>
              <Button color="inherit">
                <img src={LUMLogo} alt="main-logo"></img>
              </Button>
            </Box>
            <Box sx={{mr: 0, ml: 'auto'}}>
              <Button color="inherit" sx={{ width: 150, mr: 1, color: "white", bgcolor: "orange"}}>Medications</Button>
              <Button color="inherit" sx={{ width: 150, mr: 1, color: "white",  bgcolor: "orange"}}>Calendar</Button>
              <Button color="inherit" sx={{ width: 150, mr: 1, color: "white",  bgcolor: "orange"}}>Login</Button>
              <Button color="inherit" sx={{ width: 150, mr: 1, color: "white",  bgcolor: "orange"}}>Sign Up</Button>
            </Box>
        </Toolbar>
    </AppBar>
  </Box>
);
menubar.propTypes = {};

menubar.defaultProps = {};

export default menubar;