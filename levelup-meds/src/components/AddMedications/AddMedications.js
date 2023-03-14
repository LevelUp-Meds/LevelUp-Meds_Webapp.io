import {useRef, useState} from "react";
import { db } from "../firebase/config";
import auth from "../Auth/AuthProvider";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const medications = collection(db, "Medications");

const AddMedications = () => {

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

    const medName = useRef();
    const amount = useRef();
    const doctorNotes = useRef();
    const firstDate = useRef();

    const addAppointmentHandler = (event) => {
        event.preventDefault();
        
        if (mondaySelected === "" && tuesdaySelected === "" && wednesdaySelected === "" && thursdaySelected === "" && 
            fridaySelected === "" && saturdaySelected === "" && sundaySelected === "")
        {
            window.alert("You must select at least one day to take the prescribed medications")
            return false;
        }

        const name = medName.current.value
        const amountToTake = amount.current.value
        const medNotes = doctorNotes.current.value
        const startDate = new Date(firstDate.current.value)

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
        
        onAuthStateChanged(auth, async (user)=>{
            if(user)
            {
                const addMedications = async(loggedInUser) => {
                await addDoc(medications, {
                    amount: amountToTake,
                    days: daysToTake,
                    name: name,
                    notes: medNotes,
                    time: Timestamp.fromDate(startDate),
                    profileID: "/Profiles/" + loggedInUser.uid
                  })}
                  addMedications(user)
            }
        })
        window.location.reload(true);
            
    }

    return (<>
    <div>
    <form onSubmit={addAppointmentHandler}>
        <fieldset>
            <legend>Add Medications:</legend>
            <div>
                <label>Amount: </label>
                <input type="text" ref={amount} size="3" required></input>
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
                <input type="text" ref={medName} size="35" required></input>
            </div> 

            <div>
                <label>Notes: </label>
                <input type="text" ref={doctorNotes} size="35" required></input>
            </div>

            <div>
                <label>Start Date: </label>
                <input type="datetime-local" ref={firstDate} required></input>
            </div>

            <div>
                <input type="submit" value="Add Medication"></input>
            </div>
        </fieldset>
       
    </form>
    </div>
    </>)


}

export default AddMedications;