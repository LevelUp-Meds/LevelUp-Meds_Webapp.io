import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import {
  TextField,
  Box,
  Button,
  Link,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LumLogo from "../../assets/Logo_Orange.svg";
import auth from "../Auth/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Footer from "../Footer/Footer";

function Login() {
  // used for navigating between pages
  const navigate = useNavigate();

  // fields for each account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { signIn } = UserAuth();

  // Navigates user to dashboard
  const goToDashBoard = async () => {
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
      } else {
        console.log(errorMessage);
      }
    });
  }, [goToDashBoard]);

  // updates email on input
  const updateEmailInput = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  // updates password on input
  const updatePasswordInput = (e) => {
    setPassword(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await signIn(email, password);
      goToDashBoard();
    } catch (e) {
      setErrorMessage(e.message);
      setIsValid(false);
    }
  };

  return (
    <Box className={styles.LoginContainer}>
      <Grid container className={styles.CardContainer} boxShadow={10}>
        <Grid item className={styles.Header} xs={12} md={12}>
          <img
            src={LumLogo}
            alt="img"
            sx={{ height: "35px" }}
            className={styles.Logo}
          ></img>
          <Typography variant="h6" className={styles.Title}>
            LevelUp Meds
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="standard-basic"
            label="Email"
            className={styles.InputField}
            value={email}
            error={!isValid}
            helperText={!isValid && "Invalid email"}
            onChange={updateEmailInput}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item  sx={{ paddingTop: "1.5rem" }}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid
          container
          xs={12}
          sx={{ justifyContent: "center", display: "flex" }}
        >
          <Grid item>
            <Button
              size="large"
              variant="contained"
              type="submit"
              className={styles.MainButton}
              sx={{ marginTop: "1rem" }}
            >
              Sign-In
            </Button>
          </Grid>
          <Grid item  xs={12} sm={12} md={12}>
            <Box sx={{ marginTop: "0.5rem", display: "flex", justifyContent: "center"}} >
              <Link href="/resetpassword">Forgot password?</Link>
            </Box>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="outlined"
              onClick={goToRegister}
              className={styles.MainButton}
              sx={{marginTop: "1rem"}}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>

    // <Box className={styles.Container}>
    //   <Box className={styles.MainContent}>
    //     <Box className={styles.InnerContainer}>
    //       <Box className={styles.Card}>
    //         <img
    //           src={LumLogo}
    //           alt="img"
    //           sx={{ width: "50px", height: "50px" }}
    //         ></img>
    //         <form onSubmit={handleSubmit} className={styles.FormContainer}>
    //           <h1>LevelUp Meds</h1>
    //           <TextField
    //             id="standard-basic"
    //             label="Email"
    //             className={styles.InputField}
    //             value={email}
    //             error={!isValid}
    //             helperText={!isValid && "Invalid email"}
    //             onChange={updateEmailInput}
    //             required
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <PersonIcon fontSize="small" />
    //                 </InputAdornment>
    //               ),
    //             }}
    //           ></TextField>
    // <TextField
    //   id="standard-basic"
    //   label="Password"
    //   type="password"
    //   helperText={!isValid && "Invalid password"}
    //   className={styles.InputField}
    //   value={password}
    //   error={!isValid}
    //   onChange={updatePasswordInput}
    //   required
    //   InputProps={{
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <VisibilityIcon fontSize="small" />
    //       </InputAdornment>
    //     ),
    //   }}
    // ></TextField>
    // <Button
    //   size="large"
    //   variant="contained"
    //   type="submit"
    //   className={styles.MainButton}
    // >
    //   Sign-In
    // </Button>
    // <Link href="/resetpassword" id={styles.ForgotPass}>
    //   Forgot password?
    // </Link>
    // <Button
    //   size="large"
    //   variant="outlined"
    //   onClick={goToRegister}
    //   className={styles.MainButton}
    // >
    //   Register
    // </Button>
    //         </form>
    //       </Box>
    //     </Box>
    //   </Box>
    //   <Footer />
    // </Box>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
