/* eslint-disable no-unused-vars */
// import React from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import db from "../database/FirestoreConfig";
// import { collection, getDocs, Timestamp } from "firebase/firestore";
// import Menubar from "../Menubar/Menubar";

// const localizer = momentLocalizer(moment);

// const appointments = collection(db, "Appointments");
// const medications = collection(db, "Medications");

// var calEvents = [];

// const getMedications = async () => {
//   const medSnap = await getDocs(medications);

//   medSnap.forEach((doc) => {
//     let title = doc.data().name;
//     let start = doc.data().time.toDate();
//     let end = doc.data().time.toDate();

//     let event = { start, end, title };
//     calEvents.push(event);
//   });
// };

// const getAppointments = async () => {
//   const appSnap = await getDocs(appointments);

//   appSnap.forEach((doc) => {
//     let title = doc.data().name;
//     let start = doc.data().appointmentDate.toDate();
//     let end = doc.data().appointmentDate.toDate();

//     let event = { start, end, title };
//     calEvents.push(event);
//   });
// };

// getAppointments();
// getMedications();

const LevelUpMedsCalendar = () => {
  return (
    <>
      {/* <Menubar></Menubar>

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
      </> */}
    </>
  );
};

export default LevelUpMedsCalendar;
