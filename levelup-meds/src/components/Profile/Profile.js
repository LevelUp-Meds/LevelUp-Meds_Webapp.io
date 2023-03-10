import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import Menubar from "../Menubar/Menubar";
import "../../App.css";
import { CardHeader } from "@mui/material";
import db  from "../database/FirestoreConfig";
import auth from "../Auth/AuthProvider";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useState, React} from "react";
import TexttoSpeech from "../TextToSpeech/TextToSpeech";

const users = collection(db, "Profiles");
const appointments = collection(db, "Appointments");
const medications = collection(db, "Medications");

const profileStyle = {
    textAlign: "Center",
    width: "50%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    fontFamily: "inherit",
    fontSize: "25px",
    boxSizing: "inherit",
    borderRadius: "25px",
}

const medStyle = {
  position: 'relative',
  float: 'left',
  textAlign: "Center",
    margin: "auto",
    fontFamily: "inherit",
    fontSize: "25px",
    boxSizing: "inherit",
    marginRight: '10px',
    borderRadius: "25px"
}

const appStyle = {
  position: 'relative',
  float: 'right',
  textAlign: "Center",
    margin: "auto",
    fontFamily: "inherit",
    fontSize: "25px",
    boxSizing: "inherit",
    borderRadius: "25px"
}


const Profile = () => {

  const [name, setName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [userMeds, setMedications] = useState([{}])
  const [userApps, setAppointments] = useState([{}])

  const getUserInfo = async(loggedInUser) => {
    const userQuery = query(users, where('uid', '==', loggedInUser.uid))
    const userSnapshot = await getDocs(userQuery);
  
    userSnapshot.forEach((doc)=>{
      console.log(doc.data())
      let fullName = doc.data().fName + " " + doc.data().lName
      setName(fullName)
      let email = doc.data().email
      setEmailAddress(email)
    })
  }
  
  const getMedInfo = async(loggedInUser) => {
    const medQuery = query(medications, where('profileID', '==', '/Profiles/' + loggedInUser.uid))
    const medSnapshot = await getDocs(medQuery)
    
    let i = 0;
    var meds = []
    medSnapshot.forEach((doc)=>{
      console.log(doc.data())
      let name = doc.data().name
      let startDate = doc.data().time.toDate()
      let amount = doc.data().amount
      let days = doc.data().days
      var daysToTake = ""

      if (days.Mon === true)
      {
        daysToTake+="Monday\n"
      }

      if (days.Tue === true)
      {
        daysToTake+="Tuesday\n"
      }

      if (days.Wed === true)
      {
        daysToTake+="Wednesday\n"
      }

      if (days.Thu === true)
      {
        daysToTake+="Thursday\n"
      }

      if (days.Fri === true)
      {
        daysToTake+="Friday\n"
      }

      if (days.Sat === true)
      {
        daysToTake+="Saturday\n"
      }

      if (days.Sun === true)
      {
        daysToTake+="Sunday"
      }
      
      let id = i
      let med = {id, name, startDate, amount, daysToTake}
      meds[i] = med;
      i++;
      //userMedications.push(med)
    })

    // if(meds.length>0)
    //     setMedications(...userMeds, meds)
  }
  
  const getAppointmentInfo = async(loggedInUser) => {
    const appQuery = query(appointments, where('profileID', '==', '/Profiles/' + loggedInUser.uid))
    var apps = []
    const appSnapshot = await getDocs(appQuery)
    let i = 0;
    appSnapshot.forEach((doc)=>{
      console.log(doc.data())
      let name = doc.data().name
      let date = doc.data().appointmentDate.toDate()
      let address = doc.data().address
      let notes = doc.data().notes
      let id = i

      let app={id, name, date, address, notes}
      apps[i] = app
      //userAppointments.push(app)
      i++;
     
    })

  }
  
  onAuthStateChanged(auth, (user)=>{
   
    if(user)
    {
      getUserInfo(user)
      getAppointmentInfo(user)
      getMedInfo(user)
    }
    
    else
    {
    }
  })
  
    return (<>
        <Menubar></Menubar>
          <Card sx={profileStyle} variant="outlined">
            <CardHeader title='PROFILE INFORMATION' sx={{textDecoration: 'underline'}}></CardHeader>
            <Divider></Divider>
            <CardContent>Username: {name}</CardContent>
            <Divider></Divider>
            <CardContent>Email: {emailAddress}</CardContent>
            <Divider></Divider>
            <CardContent><TexttoSpeech id={0} textToRead={"Profile Information, UserName, " + name + " , Email, " + emailAddress} icon="Info"></TexttoSpeech></CardContent>
            <Divider></Divider>
          </Card>

          <Card sx={medStyle}>
            <CardHeader title="MEDICATIONS" sx={{textDecoration: 'underline'}}></CardHeader>
            <Divider></Divider>
            
              {userMeds.map((meds, index) => {
                
                return(
                <div key={index}>
                    <div>Name: {meds.name}</div>
                    <div>Start Date: {meds.startDate}</div>
                    <div>Amount: {meds.amount}</div>
                    <TexttoSpeech id={index} icon="Volume" textToRead={"Name, " + meds.name + ", Start Date, " + meds.startDate + ", Amount to take, " + meds.amount}></TexttoSpeech>
                    <Divider></Divider>
               </div>)
})}
          </Card>

          <Card sx={appStyle}>
            <CardHeader title="APPOINTMENTS" sx={{textDecoration: 'underline'}}></CardHeader>
              <Divider></Divider>
          {userApps.map((apps, index) => {
            
            return (
            <div key={index}>
              <div>Name: {apps.name}</div>
              <div>Date: {apps.date}</div>
              <div>Address: {apps.address} </div>
              <div>Notes: {apps.notes}</div>
              <TexttoSpeech id={index} icon="Volume" textToRead={"Name, " + apps.name + ", Date, " + apps.date + ", Address, " + apps.address + ", Notes, " + apps.notes}></TexttoSpeech>
              <Divider></Divider>
            </div>
          )})}
          </Card>
    </>)
  
}

export default Profile;

