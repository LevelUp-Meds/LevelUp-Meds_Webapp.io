/* eslint-disable no-unused-vars */
import {useRef} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase/config";
import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import './AddEvents.css'
import {Button, Badge} from "react-bootstrap";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

var calEvents = [];


const calendarStyle = {
  height: 940, 
  width: 1100,
  position: "relative",
  float: "left"
}

const formStyle = {
  color: "black",
  backgroundColor: "white",
  border: "10px solid yellow",
  borderRadius: "25px",
  fontSize: "30px",
  margin: "auto",
  textAlign: "center",
  fontFamily: "Montserrat",
  float: "right",
  position: "relative"
}


const getMedications = async () => {
  const medSnap = await getDocs(medications);

  medSnap.forEach((doc) => {
    console.log(doc);
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
    console.log(doc);
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

  const appName = useRef();
  const appNotes = useRef();
  const appDate = useRef();
  const appAddress = useRef();

  const submitHandler = async(event) => {
   event.preventDefault();

   const appointment = appName.current.value;
   const appointmentNotes = appNotes.current.value;
   const appointmentDate = new Date(appDate.current.value);
   const apppointmentLocation = appAddress.current.value;
 
   const newDoc = await addDoc(appointments, {
    address: apppointmentLocation,
    appointmentDate: Timestamp.fromDate(appointmentDate),
    name: appointment,
    notes: appointmentNotes
   })

   window.location.reload(false);

  }

  return (
    <>
      <Calendar
        events={calEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={calendarStyle}
        defaultView="day"
        defaultDate={moment().toDate()}
      />
      <br />
      <br />
      <div style={formStyle}>
        <form onSubmit={submitHandler} method="POST">
          <fieldset>
            <legend>Add Appointment:</legend>
          <div>
            <label>Appointment Name: </label>
            <input type="text" ref={appName} name="name" size="35" required ></input>
          </div>

          <div>
            <label>Address: </label>
            <input type="text" ref={appAddress} name="name" size="50" required></input>
          </div>
          
          <div>
            <label>Notes: </label>
            <input type="text" ref={appNotes} name="app_notes" required ></input>
          </div>

          <div>
            <label>Date and Time: </label>
            <input type="datetime-local" ref={appDate} name="date" required ></input>
          </div>

          <div>
            <input type="submit" name="Submit" value="Add to Calendar"></input>
          </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default LevelUpMedsCalendar;
