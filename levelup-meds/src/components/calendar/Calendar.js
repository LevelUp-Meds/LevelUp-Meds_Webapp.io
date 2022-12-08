import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {db} from '../firebase/config';
import {collection, getDocs} from 'firebase/firestore';

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

var calEvents = [
    
]


const getMedications = async() => {

    const medSnap = await getDocs(medications);
    
    medSnap.forEach((doc) => {
        console.log(doc);
        let title = doc.data().name;
        let start = doc.data().time.toDate();
        let end = doc.data().time.toDate()
        
        let event = {start , end, title}
        calEvents.push(event)
    })
}

const getAppointments = async() => {
    const appSnap = await getDocs(appointments);
    
    appSnap.forEach((doc) => {
        console.log(doc)
        let title = doc.data().name;
        let start = doc.data().appointmentDate.toDate();
        let end = doc.data().appointmentDate.toDate()

        let event = {start, end, title}
        calEvents.push(event)
    })
}

getAppointments();
getMedications();

const LevelUpMedsCalendar = () => {
    return (
       <>
        <Calendar 
            events={calEvents}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{height:700}}
            defaultView='month'
            defaultDate={moment().toDate()}
         />
       </>
    );
}

export default LevelUpMedsCalendar;