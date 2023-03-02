import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import styles from "./Medication.module.scss";
import { TextField, InputAdornment, Stack } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Menubar from "../Menubar/Menubar";

const Medication = () => {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Menubar></Menubar>
    
    <Card className={styles.MedContainer}>
      <CardContent className={styles.InputContainer}>
        <List>
          <h2>Add New Medication</h2>
          <TextField
            id="standard-basic"
            label="Medication Name"
            sx={{ m: 1, width: "30ch" }}
            className={styles.InputMedication}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicationRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Divider sx={{ margin: 1 }} />
          <List>
            <TextField
              label="Dosage"
              type="number"
              className={styles.InputDosage}
              required
              sx={{ m: 1, width: "30ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VaccinesIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end"> mg</InputAdornment>
                ),
              }}
            ></TextField>
          </List>
          <Divider sx={{ margin: 1 }} />
          <List>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField sx={{ m: 1, width: "30ch" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </List>
          <Divider sx={{ margin: 1 }} />
          <List>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Occurrence"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField sx={{ m: 1, width: "30ch" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </List>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add
          </Button>
        </List>
      </CardContent>
    </Card>
    </>
  );
};

Medication.propTypes = {};

Medication.defaultProps = {};

export default Medication;
