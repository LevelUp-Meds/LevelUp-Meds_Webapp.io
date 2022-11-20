import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.scss";
// import Auth from "../firebase/config";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import LUMLogo from "../../assets/Logo_Orange.svg";
import { style } from "@mui/system";
import Person from "@mui/icons-material/Person";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/firebase";
import { db } from "../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      signInWithEmailAndPassword( email, password).catch((error) => {
        console.log(error);
      });
      console.log();
      navigate("/homepage");
    }
    onRegister();
  };

  // const { currentUser } = useContext(AuthContext);
  // const [username, setUsername] = useState("");

  // useEffect(() => {
  //   if (currentUser) {
  //     const starCountRef = ref(db, "users/" + currentUser.uid);
  //     onValue(starCountRef, (snapshot) => {
  //       if (snapshot.exists()) {
  //         var data = snapshot.val();
  //         setUsername(data.firstName + " " + data.lastName);
  //       }
  //     });
  //   }
  // }, [currentUser]);

  // const clickLogin = () => {
  //   if (currentUser) {
  //     console.log("Edward");
  //   } else {
  //     navigate("/homepage");
  //   }
  // };

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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button id={styles.SignIn} type="submit" onClick={handleSubmit}>
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
