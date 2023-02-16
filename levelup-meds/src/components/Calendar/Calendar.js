/* eslint-disable no-unused-vars */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import '../../Calendar.css'
import AddAppointment from "../AddAppointment/AddAppointment";
import DeleteAppointment from "../DeleteAppointment/DeleteAppointment";
import DeleteMedication from "../DeleteMedication/DeleteMedication";
import UpdateAppointment from "../UpdateAppointment/UpdateAppointment";
import AddMedications from "../AddMedications/AddMedications";
import UpdateMedications from "../UpdateMedications/UpdateMedications";

const localizer = momentLocalizer(moment);

const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const calendarStyle = {
  height: 950, 
  width: 1104,
  position: "fixed",
  float: "left",
  backgroundColor: 'white',
  fontFamily: 'Montserrat'
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
}

const LevelUpMedsCalendar = () => {
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
                "\nStart date: " + start +
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
        slotPropGetter={()=>{return {style: {backgroundColor: 'white'}}}}
        eventPropGetter={(event)=>{
          const backgroundColor = event.color === "green" ? 'green': 'blue'
          return {style: {backgroundColor: backgroundColor, color: 'white'}}
        }}
      />

      <div style={formStyle}>
        <AddAppointment /> 
        <DeleteAppointment />
        <DeleteMedication />
        <UpdateAppointment />
        <AddMedications />
        <UpdateMedications />
      </div>
    </>
  );
};

export default LevelUpMedsCalendar;
