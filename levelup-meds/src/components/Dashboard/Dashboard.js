import React from "react";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { FormLabel } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import Menubar from "../Menubar/Menubar";
import { useSignup } from "../hooks/useSignup";
import Medication from "../Medication/Medication";
import { Box } from "@mui/system";
import CustomDay from "../Calendar/CustomDay";
import Footer from "../Footer/Footer";
import Appointment from "../Appointment/Appointment";

function Dashboard() {
  // const { logout } = UserAuth();
  // const { logout } = useLogout();
  const { user } = useSignup();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //   }
  // }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     if (!user) {
  //       console.log("Edward");
  //       navigate("/login");
  //     } else {
  //       console.log("Edward");
  //     }
  //   });
  // }, []);

  // const handleLogout = async (e) => {
  //   try {
  //     await logout();
  //     navigate("/login");
  //     if (!user) {
  //       <redirect to="/login"></redirect>;
  //     }
  //   } catch (e) {}
  // };

  const handleUpdate = () => {
    const findUser = async () => {
      const docRef = doc(db, "Accounts", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("No Document Exists");
      }
    };
    findUser();
  };

  const handleClick = () => {
    handleUpdate();
  };

  // const logout = () => {
  //   signOut(auth);
  // };

  return (
    <Box className={styles.Dashboard}>
      <Menubar></Menubar>
      <Box className={styles.Body}>
        <Box className={styles.LandingCard}>
          <Box className={styles.CardContents}>
            <FormLabel
              sx={{ fontSize: "3rem" }}
            >{`Welcome, ${user.displayName}!`}</FormLabel>
            {/* <p>User email: {user && user.email}</p> */}
            {/* {user && <p> Name: {user.displayName}</p>} */}

            {/* <Medication></Medication> */}
            {/* <Button variant="contained" onClick={handleClick}>
              Update User
            </Button> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
