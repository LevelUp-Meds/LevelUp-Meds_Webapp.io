import React from "react";
import PropTypes from "prop-types";
import styles from "./Login.module.scss";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import LUMLogo from "../../assets/Logo_Orange.svg";

const Login = () => (
  <Box className={styles.MainContainer}>
    <Box component="div" className={styles.LeftSide}>
      <img src={LUMLogo} alt="main-logo"></img>
    </Box>
    <Box component="div" className={styles.RightSide}>
      <FormControl>
        <h1>LevelUP Meds</h1>
        <FormLabel>Username</FormLabel>
        <Input></Input>
        <FormLabel>Password</FormLabel>
        <Input></Input>
        <Button>Submit</Button>
        <Button>Register</Button>
      </FormControl>
    </Box>
  </Box>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
