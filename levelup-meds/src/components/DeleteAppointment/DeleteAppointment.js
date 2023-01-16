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

      const deleteAppointment = async(selectedOption) => {
 
        setSelectedAppointments(selectedOption)
        console.log(selectedOption)
        console.log(selectedOption.value + ", " + selectedOption.label)
        let docID = selectedOption.value;
        
        await deleteDoc(doc(db, "Appointments", docID));
        window.location.reload(true);
      }

      return (<>
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
      </>)
}

export default DeleteAppointment;