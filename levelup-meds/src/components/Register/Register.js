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
import { updateProfile } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import auth from "../Auth/AuthProvider";
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
import { setDoc, doc } from "firebase/firestore";
import db from "../database/FirestoreConfig";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const { signup } = useSignup();
  const { signUp } = UserAuth();
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  /**
   * * Return back to login
   */
  const goBackToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    setError("");
    const res = await signUp(email, password);
    if (res) {
      const fullName = `${firstName} ${lastName}`;
      try {
        await setDoc(doc(db, "Profiles", auth.currentUser.uid), {
          fName: firstName,
          lName: lastName,
          email: email,
          sex: gender,
          uid: auth.currentUser.uid,
        });
      } catch (e) {
        console.log(e.message);
      }
      updateProfile(auth.currentUser, {
        displayName: fullName,
      })
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          console.log("Error updating profile.");
        });
    } else {
      setError("An error occcured while creating account");
      console.log(error);
    }
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

  /**
   * * Login Function Once User Clicks Submit
   */

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await signUp(email, password, displayName);
  // };

  /**
   * * Handles input change on gender
   */
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    console.log(gender);
  };

  return (
    <Box className={styles.RegisterWrapper}>
      <Grid container className={styles.RegisterCard}>
        <Grid item className={styles.Header} xs={12}>
          <FormLabel sx={{ fontSize: "2rem", margin: "100px" }}>
            Sign Up
          </FormLabel>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ textAlign: "center", padding: "1rem 0 1rem 0" }}
        >
          <Typography variant="p1">
            Tell us a little about yourself...
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            variant="standard"
            label="First Name"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
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
            variant="standard"
            label="Last Name"
            value={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
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
              value={gender}
              onChange={handleGenderChange}
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
            variant="standard"
            label="E-Mail Address"
            value={email}
            type="text"
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
            variant="standard"
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
            variant="standard"
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
            onClick={handleRegister}
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
