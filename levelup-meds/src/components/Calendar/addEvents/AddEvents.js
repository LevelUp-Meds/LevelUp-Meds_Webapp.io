import db from '../../database/FirestoreConfig';
import {addDoc, collection, Timestamp } from "firebase/firestore";

const appointments = collection(db, "Appointments")

const AddEvents = async() =>{
    let f = document.forms.eventForm
    let event = f.eventTitle.value;
    let date = f.eventDate.value;
    let address = f.eventPlace.value
    let notes = f.eventNotes.value

     await addDoc(appointments, {
        name: event,
        appointmentDate: Timestamp.fromDate(date),
        address: address,
        notes: notes
    })

    return false;
}

const AddEventForm = () => {
   
    return (
        <> 
        <form onSubmit={AddEvents()} name="eventForm">
            <label>Event Name:</label>
            <input type="text" name="eventTitle" required></input>

            <label>Start Date:</label>
            <input type="datetime-local" name="eventDate" required></input>
            
            <label>Address:</label>
            <input type="text" name="eventPlace" required></input>

            <label>Notes:</label>
            <input type="text" name="eventNotes" required></input>

            <input type="Submit"></input>
        </form>
        </>)
}

export default AddEventForm