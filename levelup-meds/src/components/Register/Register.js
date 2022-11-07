import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await createUser(email, password);
      navigate("/createsuccess");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className={styles.Register}>
      <TextField label="First name:"></TextField>
      <TextField label="Last name:"></TextField>
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
      <Button variant="contained" size="medium" onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );
}

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
