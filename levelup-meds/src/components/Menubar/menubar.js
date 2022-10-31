import React from "react";
import PropTypes from "prop-types";
import styles from "./menubar.module.scss";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Grid,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    InputLabel,
    Button,
  } from "@mui/material";
  import { style } from "@mui/system";
  import Person from "@mui/icons-material/Person";
  
import LUMLogo from "../../assets/Logo_Orange.svg";
import TestLogo from "../../assets/userIcon.png";
import LevelUpShowcase from "../../assets/showcase.webp";
import LevelUpLargeLogo from "../../assets/levelupmeds_large_logo.webp";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";

const menubar = () => (
  <Box>
    <Box className={styles.navbar} sx={{ bgcolor: "white"}}>
      <AppBar sx={{bgcolor: "transparent", color:"black"}} position="static">
          <Toolbar>
              <Box sx={{mr: 'auto'}}>
                <Button color="inherit">
                  <img className={styles.levelupmedslogo} src={LUMLogo} alt="main-logo"></img>
                </Button>
              </Box>
              <Box sx={{mr: 0, ml: 'auto'}}>
                <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Medications</Button>
                <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Calendar</Button>
                <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Login</Button>
                <Button className={styles.rightbuttons} color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Sign Up</Button>
              </Box>
          </Toolbar>
      </AppBar>
    </Box>
    <Box className={styles.contentSection}>
      <Box>
      </Box>

      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <img src={LevelUpLargeLogo} alt="main-logo"></img>
        <img src={LevelUpShowcase} alt="showcase-of-app"></img>
        <Typography variant="h3">
          About LevelUp Meds
        </Typography>
        <Typography variant="h5">
          In 2016 Judith DeLury moved back to Indiana to care for an aging aunt with dementia. Judith soon realized a solution was needed for her aunt's medication management. At the same time, she realized there was a gap in communication and coordination between the multiple caregivers that were needed for her aunt besides Judith herself. These caregivers included paid professionals as well as other family members.
        </Typography>
        <Typography variant="h5">
           Judith began exploring options available on the market and found them lacking in many qualities. Judith feels proud one of the pill sorters she tried didn't go sailing through a window! This pill sorter didn't come with any means of communication. Reminder apps do improve medication adherence; however, they are only as good as the person taking the medication. This is true even when the medication is being managed by someone else since the care recipient may well refuse to take the medication. As a result, Judith came to the conclusion communication was paramount. She began working to develop LevelUp Meds to assist caregivers with medication management and communication.
        </Typography>
        <Typography variant="h5">
          The importance of communication isn't just limited to managing medications. It includes all aspects of caregiving that affect the quality of life for care recipients as well as all caregivers involved. Coordinating schedules, doctor's appointments, hair appointments, emergency care, everyday observations are all critical to the quality of life for the care recipient(s). Having multiple caregivers for multiple care recipients compounds the logistics in caring for a loved one.
        </Typography>
        <Typography variant="h5">
          Judith began bootstrapping a plan to address these issues head-on. She started the process of developing LevelUp Meds, a software application for mobile devices that combines medication management and communication to improve the life of loved ones that need our care. Developing software is a long and expensive journey. Along the way Judith learned the importance of pets to those receiving care and those giving care. As a result, she is also pursuing software for the coordination of pet care - LevelUp Meds for pets. LevelUp Meds for pets will be developed alongside LevelUp Meds for caregivers. The difference in the two software is in FDA regulations and the cost to develop.
        </Typography>
      </Grid>
    </Box>
  </Box>

);
menubar.propTypes = {};

menubar.defaultProps = {};

export default menubar;