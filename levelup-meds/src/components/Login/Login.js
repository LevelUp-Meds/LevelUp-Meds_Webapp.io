import React from "react";
import PropTypes from "prop-types";
import styles from "./Login.module.scss";
import { TextField, Box, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LumLogo from "../../assets/Logo_Orange.svg";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const navigate = useNavigate();

  const goToDashBoard = () => {
    navigate("/dashboard");
  };
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Box className={styles.Container}>
      <Box className={styles.InnerContainer}>
        <PersonIcon
          sx={{
            position: "absolute",
            marginRight: "15rem",
            top: "31.5rem",
            color: "grey",
          }}
        />
        <VisibilityIcon
          sx={{
            position: "Absolute",
            marginRight: "15rem",
            top: "36.25rem",
            color: "grey",
          }}
        />
        <Box className={styles.Card}>
          <img
            src={LumLogo}
            alt="img"
            sx={{ width: "50px", height: "50px" }}
          ></img>
          <form className={styles.FormContainer}>
            <h1>LevelUp Meds</h1>
            <TextField
              id="standard-basic"
              label="Email"
              className={styles.InputField}
            ></TextField>
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              className={styles.InputField}
            ></TextField>
            <Button
              size="large"
              variant="contained"
              onClick={goToDashBoard}
              className={styles.MainButton}
            >
              Sign-In
            </Button>
            <Link href="/PasswordReset" id={styles.ForgotPass}>
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
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
