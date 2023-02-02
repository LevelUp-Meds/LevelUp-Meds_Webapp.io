import {useState} from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Select from "react-select";
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

const DeleteAppointment = () => {
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

      getAppointmentTitleandID();
      const [selectedAppointment, setSelectedAppointments] = useState("");

      const setDeletedAppointment = async(selectedOption) => {
 
        setSelectedAppointments(selectedOption)
        console.log(selectedOption)
        console.log(selectedOption.value + ", " + selectedOption.label)
      }

      const deleteAppointmentHandler = async(event) => {
        event.preventDefault();
        if (selectedAppointment === "" || selectedAppointment === undefined || selectedAppointment === null)
        {
          window.alert("You must select an appointment you wish to remove!")
          return false;
        }

        let docID = selectedAppointment.value;
    
        await deleteDoc(doc(db, "Appointments", docID));
        window.location.reload(true);
      }

      return (<>
        <div>
        <form onSubmit={deleteAppointmentHandler}>
          <fieldset>
            <legend>Delete Appointment:</legend>
            <div>
              <label>Select Appointment to Delete: </label>
              <Select options={appointmentOptions} onChange={setDeletedAppointment} autoFocus={true} />
            </div>
            
          <div>
            <input type="submit" name="Submit" value="Delete"></input>
          </div>
          </fieldset>
        </form>
      </div>
      </>)
}

export default DeleteAppointment;