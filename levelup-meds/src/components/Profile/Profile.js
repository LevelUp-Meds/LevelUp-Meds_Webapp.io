import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Menubar from "../Menubar/Menubar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "../../App.css";
import { Button, CardHeader, FormControlLabel, getDialogContentTextUtilityClass } from "@mui/material";
import db  from "../database/FirestoreConfig";
import auth from "../Auth/AuthProvider";
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useState, React} from "react";
import TexttoSpeech from "../TextToSpeech/TexttoSpeech";

const users = collection(db, "Profiles");

const profileStyle = {
    textAlign: "left",
    width: "50%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "40px",
    fontFamily: "inherit",
    fontSize: "25px",
    boxSizing: "inherit",
    borderRadius: "25px",
}

const titleStyle = {
  textAlign: "Center",
  width: "50%",
  margin: "auto",
  marginTop: "20px",
  marginBottom: "40px",
  fontFamily: "inherit",
  fontSize: "25px",
  boxSizing: "inherit",
  borderRadius: "25px",
}

const medStyle = {
  position: 'relative',
  float: 'left',
  textAlign: "center",
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
  const [gender, setGender] = useState('')

  const [updatedFirstName, setFirstName] = useState('')
  const [updatedLastName, setLastName] = useState('')
  const [updatedEmail, setUpdatedEmail] = useState('')
  const [updatedGender, setUpdatedGender] = useState('')


  const updateUserInfo = () => {

    onAuthStateChanged(auth, (user)=>{
      if(user)
      {
        const updateUserDoc = async(loggedInUser) =>
        {
          const userDoc = doc(db, "Profiles", loggedInUser.uid)
        
          if(updatedFirstName !== "")
          {
            await updateDoc(userDoc, {
              fName: updatedFirstName
            })
          }

          if(updatedLastName !== "")
          {
            await updateDoc(userDoc, {
              lName: updatedLastName
            })
          }

          const emailRegex = new RegExp("[a-z0-9]@[a-z0-9].[a-z]", "i")

          if(updatedEmail !== "")
          {
            if ((emailRegex.test(updatedEmail)===true))
            {
              await updateDoc(userDoc, {
                email: updatedEmail
              })
            }
          }

          if(updatedGender !== "")
          {
            await updateDoc(userDoc, {
              sex: updatedGender
            })
          }

          window.location.reload(true)
        }

        updateUserDoc(user)
      } 
    })
  }

  const getUserInfo = async(loggedInUser) => {
    const userQuery = query(users, where('uid', '==', loggedInUser.uid))
    const userSnapshot = await getDocs(userQuery);
  
    userSnapshot.forEach((doc)=>{
      console.log(doc.data())
      let fullName = doc.data().fName + " " + doc.data().lName
      setName(fullName)
      let email = doc.data().email
      setEmailAddress(email)
      let sex = doc.data().sex
      setGender(sex)
    })
  }
  
  
  
  onAuthStateChanged(auth, (user)=>{
   
    if(user)
    {
      getUserInfo(user)
    }
    
    else
    {
    }
  })
  
    return (<>
        <Menubar></Menubar>
          <Card sx={profileStyle} variant="outlined">
            <CardHeader sx={titleStyle} title='PROFILE INFORMATION' sx={{textDecoration: 'underline'}}></CardHeader>
            <Divider></Divider>
              <CardContent>Name: {name}</CardContent>
              <Divider></Divider>
              <CardContent>Email: {emailAddress}</CardContent>
              <Divider></Divider>
              <CardContent>Gender: {gender}</CardContent>
              <Divider></Divider>
              <CardContent><TexttoSpeech id={0} textToRead={"Profile Information, UserName, " + name + " , Email, " + emailAddress + " , Gender, " + gender}></TexttoSpeech></CardContent>
              <Divider></Divider>
          </Card>

          <Card sx={profileStyle} variant="outlined">
            <CardHeader title='EDIT INFORMATION' sx={{textDecoration: 'underline'}}></CardHeader>
            <Divider></Divider>
            {/* <FormControl> */}
                <CardContent>Edit First Name: <Input type="text" onChange={(event)=>setFirstName(event.target.value)} disableUnderline={true}></Input> </CardContent>
                <Divider variant="fullWidth"></Divider>
                <CardContent>Edit Last Name: <Input type="text" onChange={(event)=>setLastName(event.target.value)} disableUnderline={true}></Input> </CardContent>
                <Divider></Divider>
                {/* <CardContent>Edit Password: <Input type="text" disableUnderline={true}></Input> </CardContent>
                <Divider></Divider> */}
                <CardContent>Edit E-mail: <Input type="text" onChange={(event)=>setUpdatedEmail(event.target.value)} disableUnderline={true}></Input> </CardContent>
                <Divider></Divider>
                <CardContent>Edit Gender: 
                  <RadioGroup onChange={(event)=>setUpdatedGender(event.target.value)} row={true} sx={{alignItems: 'center', justifyContent: 'center'}}>
                    <FormControlLabel value="female" control={<Radio />} label="Female"></FormControlLabel>
                    <FormControlLabel value="male" control={<Radio />} label="Male"></FormControlLabel>
                    <FormControlLabel value="undetermined" control={<Radio />} label="Prefer Not to Say"></FormControlLabel>
                  </RadioGroup>
                </CardContent>
                <Divider></Divider>
                <CardContent>
                  <Button onClick={updateUserInfo} variant='contained' color='success' sx={{fontSize: 'inherit', border: '1px solid black', fontFamily: 'inherit', borderRadius: '25px'}}>Submit</Button>
                </CardContent>
            {/* </FormControl> */}
          </Card>



    </>)
  
}

export default Profile;
