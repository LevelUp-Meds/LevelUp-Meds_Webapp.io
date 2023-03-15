/* eslint-disable no-unused-vars */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase/config";
import "../../Calendar.css";
import AddAppointment from "../AddAppointment/AddAppointment";
import DeleteAppointment from "../DeleteAppointment/DeleteAppointment";
import DeleteMedication from "../DeleteMedication/DeleteMedication";
import UpdateAppointment from "../UpdateAppointment/UpdateAppointment";
import AddMedications from "../AddMedications/AddMedications";
import UpdateMedications from "../UpdateMedications/UpdateMedications";
import auth from "../Auth/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import Menubar from "../Menubar/Menubar";
import { onAuthStateChanged } from "firebase/auth";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const calendarStyle = {
  height: 950, 
  width: 999,
  top: 50,
  position: "fixed",
  float: "left",
  backgroundColor: "white",
  fontFamily: "Montserrat"
};

const formStyle = {
  color: "black",
  backgroundColor: "yellow",
  border: "5px solid red",
  borderRadius: "25px",
  fontSize: "30px",
  margin: "auto",
  textAlign: "center",
  fontFamily: "Montserrat",
  float: "right",
  position: "relative"
}

var calEvents = []

const getMedications = async () => {
  const medSnap = await getDocs(medications);

  medSnap.forEach((doc) => {
    let title = doc.data().name;
    let start = doc.data().time.toDate();
    let end = doc.data().time.toDate();

    let event = { start, end, title };
    calEvents.push(event);
  });
};

const getAppointments = async () => {
  const appSnap = await getDocs(appointments);

  appSnap.forEach((doc) => {
    let title = doc.data().name;
    let start = doc.data().appointmentDate.toDate();
    let end = doc.data().appointmentDate.toDate();

    let event = { start, end, title };
    calEvents.push(event);
  });
};

getAppointments();
getMedications();

const LevelUpMedsCalendar = () => {
  var calEvents = [];

  const getMedications = async (loggedInUser) => {
    const medQuery = query(medications, where('profileID', '==', '/Profiles/' + loggedInUser.uid));
    const medSnap = await getDocs(medQuery);

    medSnap.forEach((doc) => {
      //console.log(doc);
      let title = doc.data().name;
      let start = doc.data().time.toDate();
      let end = doc.data().time.toDate();

      let info =
        "Name: " +
        title +
        "\nAmount: " +
        doc.data().amount +
        "\nNotes: " +
        doc.data().notes +
        "\nStart date: " +
        start +
        "\nDays to take:";

      let days = doc.data().days;

      if (days.m === true) {
        info += "\nMonday";
      }

      if (days.t === true) {
        info += "\nTuesday";
      }

      if (days.w === true) {
        info += "\nWednesday";
      }

      if (days.r === true) {
        info += "\nThursday";
      }

      if (days.f === true) {
        info += "\nFriday";
      }

      if (days.s === true) {
        info += "\nSaturday";
      }

      if (days.u === true) {
        info += "\nSunday";
      }

      let color = "green";

      let event = { start, end, title, info, color };
      calEvents.push(event);
      
    });
  };

  const getAppointments = async (loggedInUser) => {
    const appQuery = query(appointments, where('profileID', '==', '/Profiles/' + loggedInUser.uid));
    const appSnap = await getDocs(appQuery)

    appSnap.forEach((doc) => {
      //console.log(doc)
      let title = doc.data().name;
      let start = doc.data().appointmentDate.toDate();
      let end = doc.data().appointmentDate.toDate();

      let info =
        "Name: " +
        title +
        "\nStarts at: " +
        start +
        "\nAddress: " +
        doc.data().address +
        "\nNotes: " +
        doc.data().notes;

      let event = { start, end, title, info };
      calEvents.push(event);
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user)
    {
      getAppointments(user);
      getMedications(user);
    }
  })

  return (
    <>
      <Menubar></Menubar>
      <Calendar
        events={calEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={calendarStyle}
        defaultView="day"
        defaultDate={moment().toDate()}
        selectable
        onSelectEvent={(event) => alert(event.info)}
        slotPropGetter={() => {
          return { style: { backgroundColor: "white" } };
        }}
        eventPropGetter={(event) => {
          const backgroundColor = event.color === "green" ? "green" : "blue";
          return {
            style: { backgroundColor: backgroundColor, color: "white" },
          };
        }}
      />
      
      <div style={formStyle}>
        <AddAppointment id={1}/> 
        <br /> <br />
        <DeleteAppointment id={2}/>
        <br /> <br />
        <UpdateAppointment id={3}/>
        <br /> <br />
        <AddMedications id={5}/>
        <br /> <br />
        <DeleteMedication id={4}/>
        <br /> <br />
        <UpdateMedications id={6}/>
        <br /> <br />
      </div>

    </>
  );
};

export default LevelUpMedsCalendar;
