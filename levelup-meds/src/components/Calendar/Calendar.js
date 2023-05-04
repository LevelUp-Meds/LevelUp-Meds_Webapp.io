import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import db from "../database/FirestoreConfig";
import "../../Calendar.css";
import AddAppointment from "../AddAppointment/AddAppointments";
import DeleteAppointment from "../DeleteAppointment/DeleteAppointments";
import DeleteMedication from "../DeleteMedication/DeleteMedications";
import UpdateAppointment from "../UpdateAppointment/UpdateAppointments";
import UpdateMedications from "../UpdateMedications/UpdateMedications";
import auth from "../Auth/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import Menubar from "../Menubar/Menubar";
import { onAuthStateChanged } from "firebase/auth";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const calendarStyle = {
  height: 800,
  width: "100%",
  position: "float",
  float: "left",
  backgroundColor: "white",
  fontFamily: "Montserrat",
};

const formStyle = {
  width: "100%",
  color: "black",
  backgroundColor: "white",
  border: "3px solid grey",
  fontSize: "30px",
  margin: "auto",
  textAlign: "center",
  fontFamily: "Montserrat",
  float: "right",
  position: "relative",
};

const LevelUpMedsCalendar = () => {
  var calEvents = [];
  const getMedications = async (loggedInUser) => {
    const medQuery = query(
      medications,
      where("profileID", "==", "/Profiles/" + loggedInUser.uid)
    );
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
        "\nStart date: " +
        start +
        "\nDays to take:";

      let days = doc.data().days;

      if (days.Mon === true) {
        info += "\nMonday";
      }

      if (days.Tue === true) {
        info += "\nTuesday";
      }

      if (days.Wed === true) {
        info += "\nWednesday";
      }

      if (days.Thu === true) {
        info += "\nThursday";
      }

      if (days.Fri === true) {
        info += "\nFriday";
      }

      if (days.Sat === true) {
        info += "\nSaturday";
      }

      if (days.Sun === true) {
        info += "\nSunday";
      }

      let color = "green";

      let event = { start, end, title, info, color };
      calEvents.push(event);
    });
  };

  const getAppointments = async (loggedInUser) => {
    const appQuery = query(
      appointments,
      where("profileID", "==", "/Profiles/" + loggedInUser.uid)
    );
    const appSnap = await getDocs(appQuery);

    appSnap.forEach((doc) => {
      //console.log(doc)
      let title = doc.data().name;
      let start = doc.data().date.toDate();
      let end = doc.data().date.toDate();

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
    getAppointments(user);
    getMedications(user);
  });

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

      {/* <div style={formStyle}>
      <AddAppointment id={0}></AddAppointment>
      </div> */}
    </>
  );
};

export default LevelUpMedsCalendar;
