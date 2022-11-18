import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import styles from "./Medication.module.scss";


const Medication = () => {
  document.body.style.backgroundColor = "orange"
  
  return (
      <Card sx={{ width: 500, length: 500 }}>
      <CardContent>
        <List>
          <ListItem enablePadding>
            <MedicationRoundedIcon sx={{marginRight: 2}}/>
            <ListItemText primary="Medication Name:" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem enablePadding>
            <HistoryRoundedIcon sx={{marginRight: 2}}/>
            <ListItemText primary="Dosage:" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem enablePadding>
            <HistoryRoundedIcon sx={{marginRight: 2}}/>
            <ListItemText primary="Time:" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem enablePadding>
            <ListItemButton>
            <EventNoteRoundedIcon sx={{marginRight: 2}}/>
              <ListItemText primary="Reoccurence:" />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

Medication.propTypes = {};

Medication.defaultProps = {};

export default Medication;