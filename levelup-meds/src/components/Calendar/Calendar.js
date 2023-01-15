/* eslint-disable no-unused-vars */
import {useRef, useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { invalid } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, updateDoc, doc, Timestamp, addDoc } from "firebase/firestore";
import './AddEvents.css'
import { Box } from "@mui/system";
import Select from "react-select"
import {FormControl, FormGroup, InputLabel, FormLabel, Button, ButtonGroup} from "@mui/material"

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const calendarStyle = {
  height: 950, 
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

const delMedFormStyle = {
  position: "absolute",
  top: "1150",
  left: "1150",
  float: "right",
  color: "black",
  backgroundColor: "yellow",
  border: "5px solid red",
  borderRadius: "25px",
  fontSize: "30px",
  margin: "auto",
  textAlign: "center",
  fontFamily: "Montserrat"
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

      let info = "Name: " + title + "\nAmount: " + doc.data().amount + 
                "\nNotes: " + doc.data().notes + 
                "\nDays to take:\n"
                
      let days = doc.data().days
      
      if (days.m === true)
      {
        info+="Monday\n"
      }

      if (days.t === true)
      {
        info+="Tuesday\n"
      }

      if (days.w === true)
      {
        info+="Wednesday\n"
      }

      if (days.r === true)
      {
        info+="Thursday\n"
      }

      if(days.f === true)
      {
        info+="Friday\n"
      }

      if (days.s === true)
      {
        info+="Saturday\n"
      }

      if (days.u === true)
      {
        info+="Sunday\n"
      }

      let color = "green";

      let event = { start, end, title, info, color};
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

      let info = "Name: " + title + "\nStarts at: " + start + "\nAddress: " + doc.data().address + "\nNotes: " + doc.data().notes

      let event = { start, end, title, info};
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
  
    let item = {value, label}
    appointmentOptions.push(item);
  })
  };

  const getMedicationTitleandID = async() => {
    const medSnap = await getDocs(medications);

  medSnap.forEach((doc) => {
    let label =  doc.data().name 
    let value = doc.id
  
    let item = {value, label}
    medicationOptions.push(item); 
  });
  }

  getAppointmentTitleandID();
  getMedicationTitleandID();
  const [selectedAppointment, setSelectedAppointments] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [appUpdated, setUpdatedAppointment] = useState("");

  const appName = useRef();
  const appNotes = useRef();
  const appDate = useRef();
  const appAddress = useRef();

  const updatedName = useRef();
  const updatedNotes = useRef();
  const updatedDate = useRef();
  const updatedAddress = useRef();

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

  const assignUpdatedAppointment = (selectedOption) => {
    setUpdatedAppointment(selectedOption)
  }
  
  const updateEventHandler  = async(event) => {
    event.preventDefault();

    const newName = updatedName.current.value;
    const newNotes = updatedNotes.current.value;
    const newAddress = updatedAddress.current.value;
    const newDate = new Date(updatedDate.current.value);

    if (appUpdated == null)
    {
      alert("You need to select an appointment you want to update");
      return false;
    }

    if (newName === "" && newNotes === "" && newAddress === "" && (isNaN(newDate.getTime())) )
    {
      alert("You need to specify at least one field of the appointment you want to update")
      return false;
    }

    let id = appUpdated.value;

    const updatedRef = doc(db, "Appointments", id);

    if (newName !== "")
    {
      await updateDoc(updatedRef, {
        name: newName
      })
    }

    if (newAddress !== "")
    {
      await updateDoc(updatedRef, {
        address: newAddress
      })
    }

    if (newNotes !== "")
    {
      await updateDoc(updatedRef, {
        notes: newNotes
      })
    }

    if ((!isNaN(newDate.getTime())))
    {
      await updateDoc(updatedRef, {
        appointmentDate: Timestamp.fromDate(newDate)
      })
    }

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
        selectable
        onSelectEvent={event=>alert(event.info)}
        eventPropGetter={(event)=>{
          const backgroundColor = event.color === "green" ? 'green': 'blue'
          return {style: {backgroundColor: backgroundColor, color: 'white'}}
        }}
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

      <div style={formStyle}>
        <form onSubmit={updateEventHandler}>
          <fieldset>
            <legend>Update Appointment:</legend>
            <div>
              <label>Select Appointment to Update: </label>
              <Select options={appointmentOptions} onChange={assignUpdatedAppointment} required />
            </div>

            <div>
            <label>Appointment Name: </label>
            <input type="text" ref={updatedName} name="name" size="35"></input>
          </div>

          <div>
            <label>Address: </label>
            <input type="text" ref={updatedAddress} name="name" size="50"></input>
          </div>
          
          <div>
            <label>Notes: </label>
            <input type="text" ref={updatedNotes} name="app_notes"></input>
          </div>

          <div>
            <label>Date and Time: </label>
            <input type="datetime-local" ref={updatedDate} name="date"></input>
          </div>

          <div>
            <input type="submit" name="Submit" value="Update"></input>
          </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default LevelUpMedsCalendar;
