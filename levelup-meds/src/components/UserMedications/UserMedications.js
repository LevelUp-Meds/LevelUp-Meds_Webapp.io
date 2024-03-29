import React, { useState, useEffect } from "react";
import styles from "./UserMedications.module.scss";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import db from "../database/FirestoreConfig";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UserMedications() {
  const [userMedications, setUserMedications] = useState([]);
  const { user } = UserAuth();

  const [data, setData] = useState();
  const navigate = useNavigate();

  const addMedication = (item) => {
    setUserMedications((prevMeds) => [...prevMeds, item.data()]);
  };

  const loadUserMedications = async (currentUser) => {
    // const querySnapshot = await getDocs(
    //   collection(db, "Medications"),
    //   where(`profileID`, "==", `/Profiles/${user.uid}`)
    // );

    const medRef = collection(db, "Medications");
    const q = query(
      medRef,
      where("profileID", "==", `/Profiles/${currentUser.uid}`)
    );
    const medSnap = await getDocs(q);

    medSnap.forEach((doc) => {
      //addMedication(doc);
    });

    onSnapshot(q, (snapshot) => {
      setUserMedications([]);
      snapshot.docs.map((doc) => addMedication(doc));
      // setUserMedications(snapshot.docs.map((doc) => [...doc, doc.data()]));
    });
    // console.log(`/Profiles/${user.uid}`);

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    //   addMedication(doc);
    // });
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        findUserInfo(user);
        loadUserMedications(user);
      } else {
        navigate("/login");
      }
    });

    setUserMedications([]);
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
