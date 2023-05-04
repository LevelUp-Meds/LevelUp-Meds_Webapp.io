import React, { useState, useEffect } from "react";
import styles from "./UserAppointments.module.scss";
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
import MedicationCard from "../MedicationCard/MedicationCard";
import Appointment from "../Appointment/Appointment";
import AppointmentCard from "../AppointmentCard/AppointmentCard";

export default function UserAppointments() {
  const [userAppointments, setUserAppointments] = useState([]);
  const { user } = UserAuth();

  const [data, setData] = useState();
  const navigate = useNavigate();

  const addMedication = (item) => {
    setUserAppointments((prevApp) => [...prevApp, item.data()]);
  };

  const loadUserMedications = async (currentUser) => {
    // const querySnapshot = await getDocs(
    //   collection(db, "Medications"),
    //   where(`profileID`, "==", `/Profiles/${user.uid}`)
    // );

    const medRef = collection(db, "Appointments");
    const q = query(
      medRef,
      where("profileID", "==", `/Profiles/${currentUser.uid}`)
    );

    const medSnap = await getDocs(q);

    medSnap.forEach((doc) => {
      console.log(doc);
    });

    onSnapshot(q, (snapshot) => {
      setUserAppointments([]);
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
    const address = obj.address;
    const date = obj.date;
    const name = obj.name;
    const notes = obj.notes;
    const newObject = {
      address,
      date,
      name,
      notes,
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

    setUserAppointments([]);
  }, []);

  return (
    <Box className={styles.UserAppWrapper}>
      <CardContent className={styles.UserApps} sx={{ boxShadow: 10 }}>
        <Typography variant="h5" sx={{ margin: "1rem", color: "black" }}>
          My Appointments
        </Typography>{" "}
        <>
          {userAppointments.map((e) => (
            <AppointmentCard name={e.name}></AppointmentCard>
          ))}
        </>
      </CardContent>
    </Box>
  );
}
