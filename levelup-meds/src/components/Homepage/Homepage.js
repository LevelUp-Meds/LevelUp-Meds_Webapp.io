import React from "react";

import styles from "./Homepage.module.scss";
import { Button, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import Appointment from "../Appointment/Appointment";
import Medication from "../Medication/Medication";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import HeroImage from "../../assets/medical-team.jpg";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import "../TextToSpeech/TexttoSpeech.css"
import Slider from "../Slider/Slider";
import MedTwo from "../../assets/medical_2.jpg";
import ChatImage from "../../assets/chat_image.jpg";
import MedImage from "../../assets/medicine.jpg";
import Navbar from "../Navbar/Navbar";

const navbarLinks = [
  { url: "/login", title: "Login" },
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
];

function Homepage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Box className={styles.Homepage}>
      {/* <Box className={styles.Container}>
        <h1>HOMEPAGE</h1>
        <Button variant="contained" onClick={goToLoginPage}>
          Go TO LOGIN PAGE
        </Button>
      </Box>
      <Footer /> */}
      <Navbar navbarLinks={navbarLinks}></Navbar>
      <Hero imageSrc={HeroImage}></Hero>
      <Slider
        imageSrc={MedTwo}
        title={"Schedule Your Appointments"}
        subTitle={"scheduling an appointment has never been easier."}
      ></Slider>
      <TextToSpeech id={0} label="Schedule Speech" textToRead="Schedule Your Appointments, 
              scheduling an appointment has never been easier"></TextToSpeech>
      
      <Slider
        imageSrc={ChatImage}
        title={"Live Chat"}
        subTitle="Send and receive messages with a medical professional."
        flipped={true}
      ></Slider>
      <TextToSpeech id={1} label="Message Speech" textToRead="Live Chat, 
          Send and receive messages with a medical professional"></TextToSpeech>

      <Slider
        imageSrc={MedImage}
        title={"Track You Medications"}
        subTitle="Look at the calendar and see what medications you need to take."
      ></Slider>
      <TextToSpeech id={2} label="Medication Speech"  textToRead="Track Your Medications, 
          Look at the calendar and see what medications you need to take"></TextToSpeech>
    </Box>
  );
}

export default Homepage;
