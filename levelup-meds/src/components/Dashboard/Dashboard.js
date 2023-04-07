import React, { useContext, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { FormLabel, Button } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import Menubar from "../Menubar/Menubar";
import { useSignup } from "../hooks/useSignup";
import Medication from "../Medication/Medication";
import { Box } from "@mui/system";
import CustomDay from "../Calendar/CustomDay";
import Footer from "../Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
// import auth from "../Auth/AuthProvider";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import UserMedications from "../UserMedications/UserMedications";

function Dashboard() {
  // const { logout } = UserAuth();
  // const { logout } = useLogout();
  // const { user } = useSignup();
  const [data, setData] = useState(null);
  const { user } = UserAuth();

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

  // const handleUpdate = () => {
  //   const findUser = async () => {
  //     const docRef = doc(db, "Profiles", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log(docSnap.data());
  //     } else {
  //       console.log("No Document Exists");
  //     }
  //   };
  //   findUser();
  // };

  // useEffect(() => {
  //   handleUpdate();
  // }, []);

  const findUserInfo = async (user) => {
    const docRef = doc(db, "Profiles", user.uid);
    const docSnap = await getDoc(docRef);
    const obj = docSnap.data();
    const firstName = obj.firstName;
    const lastName = obj.lastName;
    const newObject = {
      firstName,
      lastName,
    };
    setData({ ...data, ...newObject });

    // if (docSnap.exists()) {
    //   setData({...data, ...newObject})
    // } else {
    //   console.log("No Document Exists");
    // }
  };

  // useEffect(() => {
  //   console.log(user.displayName);
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       findUserInfo(user);
  //     } else {
  //       navigate("/login");
  //     }
  //   });
  // }, []);

  // const logout = () => {
  //   signOut(auth);
  // };

  return (
    <Box className={styles.Dashboard}>
      <Menubar></Menubar>
      <Box className={styles.DashboardContent}>
        <Box className={styles.MedicationsWrapper}>
          <Medication></Medication>
          <UserMedications></UserMedications>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
