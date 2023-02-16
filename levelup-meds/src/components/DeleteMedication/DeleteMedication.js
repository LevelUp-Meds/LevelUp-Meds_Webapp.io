import {useState} from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Select from "react-select";
import { Box } from "@mui/system";
import {FormControl, FormGroup, InputLabel, FormLabel, Button, ButtonGroup} from "@mui/material"
import '../../Calendar.css'

const medications = collection(db, "Medications");
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

const DeleteMedication = () => {
    var medicationOptions = [];

    const getMedicationTitleandID = async() => {
        const medSnap = await getDocs(medications);
    
      medSnap.forEach((doc) => {
        let label =  doc.data().name 
        let value = doc.id
      
        let item = {value, label}
        medicationOptions.push(item); 
      });
      }

      getMedicationTitleandID();
      const [selectedMedication, setSelectedMedication] = useState("");

      const deleteMedication = async(selectedOption) => {
 
        setSelectedMedication(selectedOption)
        console.log(selectedOption)
        console.log(selectedOption.value + ", " + selectedOption.label)
      }

      const deleteMedicationHandler = async(event) => {
        event.preventDefault();
        if (selectedMedication === "" || selectedMedication === undefined || selectedMedication === null)
        {
          window.alert("You must select a medication you wish to remove!")
          return false;
        }

        let docID = selectedMedication.value;
        
        await deleteDoc(doc(db, "Medications", docID));
        window.location.reload(true);
      }

      return (<>
        <div>
        <form onSubmit={deleteMedicationHandler}>
          <fieldset>
            <legend>Delete Medication:</legend>
            <div>
              <label>Select Medication to Delete: </label>
              <Select options={medicationOptions} onChange={deleteMedication} autoFocus={true} />
            </div>
            
            <div>
              <input type="submit" name="Submit" value="Delete"></input>
            </div>

          </fieldset>
        </form>
      </div>
      </>)
      


}

export default DeleteMedication;