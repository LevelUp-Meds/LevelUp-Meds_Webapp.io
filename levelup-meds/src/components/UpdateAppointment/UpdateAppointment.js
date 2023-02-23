import {useRef, useState} from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import Select from "react-select"
import TexttoSpeech from "../TextToSpeech/TextToSpeech";
import { Box } from "@mui/system";
import {FormControl, FormGroup, InputLabel, FormLabel, Button, ButtonGroup} from "@mui/material"
import '../../Calendar.css'

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

const UpdateAppointment = ({id, label}) => {

  var textForSpeech = "Update Appointment Form, "
    textForSpeech+="Select from drop down menu which appointment you want to update, "
    textForSpeech+="Then, you have the choice of updating whichever of the following you want to, "
    textForSpeech+="1, the name of the appointment, "
    textForSpeech+="2, the location of the appointment, "
    textForSpeech+="3, the notes for the appointment, "
    textForSpeech+="4, the date and time of the appointment "

    var appointmentOptions = [];
    const getAppointmentTitleandID = async() => {
        const appSnap = await getDocs(appointments);
        
        appSnap.forEach((doc) => {
        let label =  doc.data().name
        let value = doc.id
      
        let item = {value, label}
        appointmentOptions.push(item);
      })
      };

      getAppointmentTitleandID()

      const [appUpdated, setUpdatedAppointment] = useState("");

      const updatedName = useRef();
      const updatedNotes = useRef();
      const updatedDate = useRef();
      const updatedAddress = useRef();

      const assignUpdatedAppointment = (selectedOption) => {
        setUpdatedAppointment(selectedOption)
      }
      
      const updateEventHandler  = async(event) => {
        event.preventDefault();
    
        const newName = updatedName.current.value;
        const newNotes = updatedNotes.current.value;
        const newAddress = updatedAddress.current.value;
        const newDate = new Date(updatedDate.current.value);
    
        if (appUpdated === "" || appUpdated === undefined || appUpdated === null)
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

      return(<>
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
        <TexttoSpeech id={id} label={label} textToRead={textForSpeech}></TexttoSpeech>
      </>)
}

export default UpdateAppointment;