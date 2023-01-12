/* eslint-disable no-unused-vars */
import {useRef, useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc, Timestamp, addDoc } from "firebase/firestore";
import './AddEvents.css'
import Select from "react-select"
import {Button, Badge} from "react-bootstrap";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const calendarStyle = {
  height: 940, 
  width: 1100,
  position: "relative",
  float: "left"
}

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
  position: "relative",
  marginBottom: "10px"
}

const LevelUpMedsCalendar = () => {
  var appointmentOptions = [];
  var medicationOptions = [];
  var calEvents = [];
  
  const getMedications = async () => {
    const medSnap = await getDocs(medications);
  
    medSnap.forEach((doc) => {
      //console.log(doc);
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
      //console.log(doc)
      let title =  doc.data().name
      let start = doc.data().appointmentDate.toDate();
      let end = doc.data().appointmentDate.toDate();
  
      let event = { start, end, title };
      calEvents.push(event);
    });
  };
  
  
  getAppointments();
  getMedications();

  const getAppointmentTitleandID = async() => {
    const appSnap = await getDocs(appointments);
    
    appSnap.forEach((doc) => {
    let label =  doc.data().name
    let value = doc.id
  
   // console.log(label + ", " + value);
  
    let item = {value, label}
    appointmentOptions.push(item);
  })
  };

  const getMedicationTitleandID = async() => {
    const medSnap = await getDocs(medications);

  medSnap.forEach((doc) => {
    //console.log(doc);
    let label =  doc.data().name
    let value = doc.id
  
   // console.log(label + ", " + value);
  
    let item = {value, label}
    medicationOptions.push(item); 
  });
  }

  getAppointmentTitleandID();
  getMedicationTitleandID();
  const [selectedAppointment, setSelectedAppointments] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const appName = useRef();
  const appNotes = useRef();
  const appDate = useRef();
  const appAddress = useRef();

  const addToCalendarHandler = async(event) => {
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

   window.location.reload(true);

  }

  const deleteAppointment = async(selectedOption) => {
 
    setSelectedAppointments(selectedOption)
    console.log(selectedOption)
    console.log(selectedOption.value + ", " + selectedOption.label)
    let docID = selectedOption.value;
    
    await deleteDoc(doc(db, "Appointments", docID));
    window.location.reload(true);
  }

  const deleteMedication = async(selectedOption) => {
 
    setSelectedMedication(selectedOption)
    console.log(selectedOption)
    console.log(selectedOption.value + ", " + selectedOption.label)
    let docID = selectedOption.value;
    
    await deleteDoc(doc(db, "Medications", docID));
    window.location.reload(true);
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
    
      <div style={formStyle}>
        <form onSubmit={addToCalendarHandler}>
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

      <div style={formStyle}>
        <form>
          <fieldset>
            <legend>Delete Appointment:</legend>
            <div>
              <label>Select Appointment to Delete: </label>
              <Select options={appointmentOptions} onChange={deleteAppointment} autoFocus={true} />
            </div>
          </fieldset>
        </form>
      </div>

      <div style={formStyle}>
        <form>
          <fieldset>
            <legend>Delete Medication:</legend>
            <div>
              <label>Select Medication to Delete: </label>
              <Select options={medicationOptions} onChange={deleteMedication} autoFocus={true} />
            </div>
          </fieldset>
        </form>
      </div>

      
    </>
  );
};

export default LevelUpMedsCalendar;
