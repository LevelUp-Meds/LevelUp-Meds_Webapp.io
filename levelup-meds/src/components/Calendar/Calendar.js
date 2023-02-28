/* eslint-disable no-unused-vars */
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import db from "../database/FirestoreConfig";
import auth from "../Auth/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import Menubar from "../Menubar/Menubar";
import { onAuthStateChanged } from "firebase/auth";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");
// const loggedInUser = auth.currentUser;
//console.log(loggedInUser)
var calEvents = [];


const getMedications = async(loggedInUser) => {

    const q = query(medications, where('profileID', '==', "/Profiles/" + loggedInUser.uid))
    const medSnap = await getDocs(q);

    medSnap.forEach((doc) => {
    let title = doc.data().name;
    let start = doc.data().time.toDate();
    let end = doc.data().time.toDate();
    let event = { start, end, title };
    calEvents.push(event);
  });
  
};

const getAppointments = async(loggedInUser) => {

    const q = query(appointments, where('profileID', '==', "/Profiles/" + loggedInUser.uid))
    const appSnap = await getDocs(q);
  
    appSnap.forEach((doc) => {
      let title = doc.data().name;
      let start = doc.data().appointmentDate.toDate();
      let end = doc.data().appointmentDate.toDate();
      let event = { start, end, title };
      calEvents.push(event);
    });
};
 
onAuthStateChanged(auth, (user) => {
  if(user)
  {
    getAppointments(user)
    getMedications(user)
  }
})

const LevelUpMedsCalendar = () => {
  return (
    <>
      <Menubar></Menubar>

      <>
        <Calendar
          events={calEvents}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          defaultView="day"
          defaultDate={moment().toDate()}
        />
      </>
    </>
  );
};

export default LevelUpMedsCalendar;
