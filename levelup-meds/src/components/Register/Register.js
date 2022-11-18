import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.scss";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useSubmit } from "react-router-dom";
import { useSignup, isPending, error } from "../hooks/useSignup";

function Register() {
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className={styles.Register}>
      <form typeof="submit" onSubmit={handleSubmit}>
        <TextField
          label="Full name:"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          value={displayName}
        ></TextField>

        <TextField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
        ></TextField>
        <TextField
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
        ></TextField>
        <Button variant="contained" size="medium" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
