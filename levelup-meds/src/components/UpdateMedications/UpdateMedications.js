import {useRef, useState} from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import Select from "react-select"

const medications = collection(db, "Medications");

const UpdateMedications = () => {
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
      
      const updateMedication = async(selectedOption) => {
 
        setSelectedMedication(selectedOption)
        console.log(selectedOption)
        console.log(selectedOption.value + ", " + selectedOption.label)
      }


      
    const [mondaySelected, setMondaySelected] = useState("")
    const [tuesdaySelected, setTuesdaySelected] = useState("");
    const [wednesdaySelected, setWednesdaySelected]  = useState("")
    const [thursdaySelected, setThursdaySelected]  = useState("")
    const [fridaySelected, setFridaySelected]  = useState("")
    const [saturdaySelected, setSaturdaySelected] = useState("")
    const [sundaySelected, setSundaySelected] = useState("")

    const mondayHandler = (option) => {
        setMondaySelected(option.target.value)
    }

    const tuesdayHandler = (option) => {
        setTuesdaySelected(option.target.value)
    }

    const wednesdayHandler = (option) => {
        setWednesdaySelected(option.target.value)
    }

    const thursdayHandler = (option) => {
        setThursdaySelected(option.target.value)
    }

    const fridayHandler = (option) => {
        setFridaySelected(option.target.value)
    }

    const saturdayHandler = (option) => {
        setSaturdaySelected(option.target.value)
    }

    const sundayHandler = (option) => {
        setSundaySelected(option.target.value)
    }

    const updatedMedName = useRef();
    const updatedAmount = useRef();
    const updatedMedNotes = useRef();
    const updatedStartDate = useRef();

    const updateMedicationHandler = async(event) => {
        event.preventDefault();

        if (selectedMedication === "" || selectedMedication === undefined || selectedMedication === null)
        {
          window.alert("You must select a medication you wish to update!")
          return false;
        }

        const name = updatedMedName.current.value
        const amountToTake = updatedAmount.current.value
        const medNotes = updatedMedNotes.current.value
        const startDate = new Date(updatedStartDate.current.value)

        if ((name === "" && amountToTake === "" && medNotes === "" && ( isNaN(startDate.getTime()) ) ) && (mondaySelected === "" && tuesdaySelected === "" && wednesdaySelected === "" && thursdaySelected === "" && 
        fridaySelected === "" && saturdaySelected === "" && sundaySelected === ""))
        {
            alert("You need to specify at least one field of the appointment you want to update")
            return false;
        }

        let daysToTake = {f: false, 
            m: false, 
            r: false,
            s: false,
            t: false,
            u: false,
            w: false}

        if(mondaySelected === "Monday")
        {
            daysToTake.m = true;
        }

        if (tuesdaySelected === "Tuesday")
        {
            daysToTake.t = true;
        }

        if (wednesdaySelected === "Wednesday")
        {
            daysToTake.w = true;
        }

        if (thursdaySelected === "Thursday")
        {
            daysToTake.r = true;
        }

        if (fridaySelected === "Friday")
        {
            daysToTake.f = true;
        }

        if (saturdaySelected === "Saturday")
        {
            daysToTake.s = true;
        }

        if (sundaySelected === "Sunday")
        {
            daysToTake.u = true;
        }

        let id = selectedMedication.value;

        const updatedRef = doc(db, "Medications", id);

        if (daysToTake.f === false && daysToTake.m === false && daysToTake.r === false
            && daysToTake.s === false && daysToTake.t === false && daysToTake.u === false
            && daysToTake.w === false)
        {
           //do not update any days to take meds if no no days are true 
        }

        else
        {
            await updateDoc(updatedRef, {
                days: daysToTake
            })
        }

        if (name !== "")
        {
            await updateDoc(updatedRef, {
                name: name
            })
        }

        if (medNotes !== "")
        {   
            await updateDoc(updatedRef, {
                notes: medNotes
            })
        }   
        
        if (amountToTake !== "")
        {
            await updateDoc(updatedRef, {
                amount: amountToTake
            })
        }

        if ((!isNaN(startDate)))
        {
            await updateDoc(updatedRef, {
                time: Timestamp.fromDate(startDate)
            })
        }

        window.location.reload(true);

    }

    return(
    <>
    <form onSubmit={updateMedicationHandler}>
        <fieldset>
            <legend>Update Medications: </legend>

            <div>
              <label>Select Medication to Update: </label>
              <Select options={medicationOptions} onChange={updateMedication}></Select>
            </div>

            <div>
                <label>Amount: </label>
                <input type="text" ref={updatedAmount} size="3"></input>
            </div>

            <div>
                <label style={ {textDecoration: "underline"}}>Days to Take: </label>
                <div>
                    <label>Monday: </label> <input onChange={mondayHandler} value="Monday" checked={mondaySelected==="Monday"} type="radio"></input>
                </div>

                <div>
                    <label>Tuesday: </label> <input onChange={tuesdayHandler} value="Tuesday" checked={tuesdaySelected==="Tuesday"} type="radio"></input>
                </div>

                <div>
                    <label>Wednesday: </label> <input onChange={wednesdayHandler} value="Wednesday" checked={wednesdaySelected==="Wednesday"} type="radio"></input>
                </div>

                <div>
                    <label>Thursday: </label> <input onChange={thursdayHandler} value="Thursday" checked={thursdaySelected==="Thursday"} type="radio"></input>
                </div>

                <div>
                    <label>Friday: </label> <input value="Friday" onChange={fridayHandler} checked={fridaySelected==="Friday"} type="radio"></input>
                </div>

                <div>
                    <label>Saturday: </label> <input value="Saturday" onChange={saturdayHandler} checked={saturdaySelected==="Saturday"} type="radio"></input>
                </div>

                <div>
                    <label>Sunday: </label> <input value="Sunday" onChange={sundayHandler} checked={sundaySelected==="Sunday"} type="radio"></input>
                </div>
            </div>

            <div>
                <label>Name: </label>
                <input type="text" ref={updatedMedName} size="35"></input>
            </div>

            <div>
                <label>Notes: </label>
                <input type="text" ref={updatedMedNotes} size="35"></input>
            </div>

            <div>
                <label>Start Date: </label>
                <input type="datetime-local" ref={updatedStartDate}></input>
            </div>

            <div>
                <input type="submit" value="Update Medication"></input>
            </div>
        </fieldset>
    </form>
    </>)

}

export default UpdateMedications;