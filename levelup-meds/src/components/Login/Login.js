import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@mui/material";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import LUMLogo from "../../assets/Logo_Orange.svg";
import { style } from "@mui/system";
import Person from "@mui/icons-material/Person";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  //const navigate = useNavigate();

  // useEffect(() => {
  //   if (loading) {
  //     console.log("inside");
  //     return;
  //   }
  //   if (user) navigate("");
  // }, [user, loading]);
  return (
    <Box className={styles.MainContainer}>
      <Box component={"div"} className={styles.CardContainer}>
        <Box component={"div"} className={styles.InnerCardContainer}>
          <Box component="div" className={styles.LeftSide}>
            <img src={LUMLogo} alt="main-logo"></img>
          </Box>
          <Box component="div" className={styles.RightSide}>
            <FormControl className={style.FormContainer}>
              <FormLabel>Email</FormLabel>
              <Person
                sx={{
                  position: "absolute",
                  right: "230px",
                  top: "57.5px",
                  color: "gray",
                }}
              ></Person>
              <Input type="email" placeholder="Email"></Input>
              <FormLabel>Password</FormLabel>
              <HttpsRoundedIcon
                sx={{
                  position: "absolute",
                  color: "gray",
                  right: "230px",
                  bottom: "222px",
                }}
              ></HttpsRoundedIcon>
              <Input type="password" placeholder="Password"></Input>
              <Button id={styles.SignIn}>Login</Button>
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
