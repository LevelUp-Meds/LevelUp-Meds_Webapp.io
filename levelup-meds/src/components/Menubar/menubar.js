import React from "react";
import PropTypes from "prop-types";
import styles from "./Menubar.module.scss";
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
  import { style } from "@mui/system";
  import Person from "@mui/icons-material/Person";
import LUMLogo from "../../assets/Logo_Orange.svg";
import LevelUpShowcase from "../../assets/showcase.webp";
import LevelUpLargeLogo from "../../assets/levelupmeds_large_logo.webp";

export default function Menubar() {
  return (
    <Box>
      <Box className={styles.navbar} sx={{ bgcolor: "white"}}>
        <AppBar sx={{bgcolor: "transparent", color:"black"}} position="static">
            <Toolbar>
                <Box sx={{mr: 'auto'}}>
                  <Button color="inherit">
                    <img className={styles.levelupmedslogo} src={LUMLogo} alt="main-logo"></img>
                  </Button>
                </Box>
                <Box sx={{mr: 0, ml: 'auto'}}>
                  <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Medications</Button>
                  <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Calendar</Button>
                  <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Login</Button>
                  <Button color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

Menubar.propTypes = {};

Menubar.defaultProps = {};