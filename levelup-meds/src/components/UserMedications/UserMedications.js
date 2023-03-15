import React, { useState, useEffect } from "react";
import styles from "./UserMedications.module.scss";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, where } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import db from "../database/FirestoreConfig";

export default function UserMedications() {
  const [userMedications, setUserMedications] = useState([]);
  const { user } = UserAuth();

  const fetchMedication = (item) => {
    setUserMedications((prevMeds) => [...prevMeds, item.data()]);
  };

  const loadUserMedications = async () => {
    const querySnapshot = await getDocs(
      collection(db, "Medications"),
      where(`ProfileID`, "==", `/Profiles/${user.uid}`)
    );

    querySnapshot.forEach((doc) => {
      fetchMedication(doc);
    });
  };

  useEffect(() => {
    loadUserMedications();
  }, []);

  return (
    <Box className={styles.UserMedWrapper}>
      <CardContent className={styles.UserMeds} sx={{ boxShadow: 10 }}>
        <Typography variant="h5" sx={{ margin: "1rem", color: "black" }}>
          My Medications
        </Typography>{" "}
        <>
          {userMedications.map((e) => (
            <Box key={`${e.name} + ${user.uid}`}>{e.name}</Box>
          ))}
        </>
      </CardContent>
    </Box>
  );
}
