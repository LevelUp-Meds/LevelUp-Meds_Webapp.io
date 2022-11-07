import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Login.module.scss";
import { TextField, Box, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LumLogo from "../../assets/Logo_Orange.svg";
import auth from "../Auth/AuthProvider";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import { collection, Doc, setDoc, query } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import { onAuthStateChanged } from "firebase/auth";
import Menubar from "../Menubar/Menubar";
import firebaseConfig from "../config/firebase";
import { UserAuth } from "../context/AuthContext";

function Login() {
  // used for navigating between pages
  const navigate = useNavigate();

  // fields for each account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { user, signIn } = UserAuth();

  // Navigates user to dashboard
  const goToDashBoard = () => {
    navigate("/dashboard");
  };

  // Navigates user to register page
  const goToRegister = () => {
    navigate("/register");
  };

  // signs user into Firebase
  // const login = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       if (user) {
  //         setUser(user);
  //         // goToDashBoard();
  //       }
  //     })
  //     .catch(() => {
  //       setIsValid(false);
  //     });
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        goToDashBoard();
      }
    });
  }, []);

  // updates email on input
  const updateEmailInput = (e) => {
    setEmail(e.target.value);
  };

  // updates password on input
  const updatePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  // // handles login
  // const handleLogin = (e) => {
  //   login();
  // };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    try {
      await signIn(email, password);
      goToDashBoard();
    } catch (e) {
      setErrorMessage(e.message);
      console.log(e.message);
    }
  };

  return (
    <Box className={styles.Container}>
      <Menubar></Menubar>
      <Box className={styles.MainContent}>
        <Box className={styles.InnerContainer}>
          <Box className={styles.Card}>
            <img
              src={LumLogo}
              alt="img"
              sx={{ width: "50px", height: "50px" }}
            ></img>
            <form type="submit" className={styles.FormContainer}>
              <h1>LevelUp Meds</h1>
              <TextField
                id="standard-basic"
                label="Email"
                className={styles.InputField}
                value={email}
                error={!isValid}
                helperText={!isValid && "Invalid email"}
                onChange={updateEmailInput}
                required
              ></TextField>
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                helperText={!isValid && "Invalid password"}
                className={styles.InputField}
                value={password}
                error={!isValid}
                onChange={updatePasswordInput}
                required
              ></TextField>
              <Button
                size="large"
                variant="contained"
                onClick={handleSubmit}
                className={styles.MainButton}
              >
                Sign-In
              </Button>
              <Link href="/resetpassword" id={styles.ForgotPass}>
                Forgot password?
              </Link>
              <Button
                size="large"
                variant="outlined"
                onClick={goToRegister}
                className={styles.MainButton}
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
