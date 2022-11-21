import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.scss";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useSubmit } from "react-router-dom";
import { useSignup, isPending, error } from "../hooks/useSignup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { Image, Opacity } from "@mui/icons-material";
import medTeam from "../../assets/medical-team.jpg";

function Register() {
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useSignup();

  const { user, createUser } = UserAuth();
  const navigate = useNavigate();

  // const handleRegister = () => {

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  // const handleSubmit = async (e) => {
  //   try {
  //     await createUser(email, password);
  //     updateProfile(auth.currentUser, {
  //       displayName: firstName + " " + lastName,
  //     })
  //       .then(() => {
  //         console.log("profile updated");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     navigate("/dashboard");
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <Box className={styles.Register}>
      <Box className={styles.Left}>
        <Box className={styles.ImagesContainer}>
          <img
            src={medTeam}
            alt="med-team"
            id="med-team"
            style={{ width: "400px", opacity: "0.8" }}
          ></img>
        </Box>
      </Box>
      <Box className={styles.Right}>
        <Box className={styles.RegisterCard}>
          <form
            className={styles.InnerCard}
            typeof="submit"
            onSubmit={handleSubmit}
          >
            <FormLabel sx={{ fontSize: "2rem" }}>Sign Up</FormLabel>
            <TextField
              label="Full name:"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              value={displayName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            ></TextField>

            <TextField
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              label="Password"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              label="Confirm Password"
              value={confirmPassword}
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Button variant="contained" size="large" type="submit">
              Register
            </Button>
          </form>
          <ArrowBackIcon className={styles.BackIcon}></ArrowBackIcon>
        </Box>
      </Box>
    </Box>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
