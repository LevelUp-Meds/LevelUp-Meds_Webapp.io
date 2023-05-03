import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import "./MedicationCard.css";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db from "../database/FirestoreConfig";
import { UserAuth } from "../context/AuthContext";

export default function MedicationCard({ name, amount }) {
  const [data, setData] = useState();
  const { user } = UserAuth();

  const loadUserMedications = async () => {
    // const querySnapshot = await getDocs(
    //   collection(db, "Medications"),
    //   where(`profileID`, "==", `/Profiles/${user.uid}`)
    // );

    const medRef = collection(db, "Medications");
    const q = query(medRef, where("medicationID", "==", `${user.uid}/${name}`));
    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      const docRef = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "Medications", docRef));
    }
  };

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
  };

  useEffect(() => {
    if (user) {
      findUserInfo(user);
    }
  }, []);

  return (
    <Box className="MedicationCardWrapper">
      <Box className="MedInfoWrapper">
        <Typography>
          {name} {amount}
        </Typography>
      </Box>
      <Box className="CancelIconWrapper">
        <IconButton size="small" onClick={loadUserMedications}>
          <CancelIcon style={{ color: "red" }} />
        </IconButton>
      </Box>
    </Box>
  );
}