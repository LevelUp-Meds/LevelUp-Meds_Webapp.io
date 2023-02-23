import React, { useState } from "react";
import styles from "./Register.module.scss";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import medTeam from "../../assets/medical-team.jpg";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useSignup();

  const { user, createUser } = UserAuth();
  const navigate = useNavigate();

  const goBackToLogin = () => {
    console.log(gender);
    navigate("/login");
  };

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
    <Box className={styles.RegisterWrapper}>
      <Grid container className={styles.RegisterCard}>
        <Grid item className={styles.Header} xs={12}>
          <FormLabel sx={{ fontSize: "2rem", margin: "100px" }}>
            Sign Up
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
          <Typography variant="p1">
            Tell us a little about yourself...
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="First Name"
            value={firstName}
            type="password"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="Last Name"
            value={lastName}
            type="password"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="E-Mail Address"
            value={email}
            type="password"
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
        </Grid>

        <Grid item xs={12} md={12}>
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
        </Grid>
        <Grid item xs={12} md={12}>
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
        </Grid>
        <Grid item xs={12} md={12} sx={{ paddingTop: "0.75rem" }}>
          <Button
            variant="contained"
            onClick={goBackToLogin}
            sx={{ marginRight: "0.4rem" }}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginLeft: "0.4rem" }}
          >
            Next
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
