import {useRef} from "react";
import { db } from "../firebase/config";
import { collection, Timestamp, addDoc } from "firebase/firestore";
import { Box } from "@mui/system";
import {FormControl, FormGroup, InputLabel, FormLabel, Button, ButtonGroup} from "@mui/material"
import '../../Calendar.css';
import auth from "../Auth/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";


const appointments = collection(db, "Appointments");

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

const AddAppointment = () => {
    const appName = useRef();
    const appNotes = useRef();
    const appDate = useRef();
    const appAddress = useRef();

    const addToCalendarHandler = (event) => {
        event.preventDefault();
     
        const appointment = appName.current.value;
        const appointmentNotes = appNotes.current.value;
        const appointmentDate = new Date(appDate.current.value);
        const apppointmentLocation = appAddress.current.value;

        onAuthStateChanged(auth, (user)=>{
          if(user)
          {
            const addAppointment = async(loggedInUser) => {
              await addDoc(appointments, {
              address: apppointmentLocation,
              appointmentDate: Timestamp.fromDate(appointmentDate),
              name: appointment,
              notes: appointmentNotes,
              profileID: "/Profiles/" + loggedInUser.uid
            })}
            addAppointment(user)
          }}
           
          )
     
        window.location.reload(true);
     
       }

    return(<>
        <div>
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
    </>)
}

export default AddAppointment;