import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import Auth from "../firebase/firebase";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  InputBase,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import LUMLogo from "../../assets/Logo_Orange.svg";
import { style } from "@mui/system";
import Person from "@mui/icons-material/Person";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box className={styles.MainContainer}>
      <Box component={"div"} className={styles.CardContainer}>
        <Box component={"div"} className={styles.InnerCardContainer}>
          <Box component="div" className={styles.LeftSide}>
            <img src={LUMLogo} alt="main-logo"></img>
          </Box>
          <Box component="div" className={styles.RightSide}>
            <FormControl
              className={style.FormContainer}
              onSubmit={handleSubmit}
            >
              <FormLabel>Email</FormLabel>
              <Person
                sx={{
                  position: "absolute",
                  right: "230px",
                  top: "57.5px",
                  color: "gray",
                }}
              ></Person>
              <Input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              ></Input>
              <FormLabel>Password</FormLabel>
              <HttpsRoundedIcon
                sx={{
                  position: "absolute",
                  color: "gray",
                  right: "230px",
                  bottom: "222px",
                }}
              ></HttpsRoundedIcon>
              <Input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              ></Input>
              <Button id={styles.SignIn} type="submit" onClick={login}>
                Login
              </Button>
              <Link to="/levelup-meds/" variant="body2" id={styles.ForgotPass}>
                Forgot password?
              </Link>
              <Button id={styles.Register}>Register</Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
