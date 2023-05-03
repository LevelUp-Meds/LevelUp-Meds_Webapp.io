import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./Appointment.module.scss";
import dayjs from "dayjs";
import { getDocs, addDoc, collection, query } from "firebase/firestore";
import db from "../database/FirestoreConfig";
import { UserAuth } from "../context/AuthContext";

export default function Appointment() {
  const { user } = UserAuth();
  const [appointmentName, setAppointmentName] = useState("");
  const [d, setD] = useState(new Date());
  const [date, setDate] = useState(dayjs(d));
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddAppointment = async () => {
    //query(collection(db, "Medications"));
    await addDoc(collection(db, "Appointments"), {
      name: appointmentName,
      address: address,
      notes: notes,
      date: date.toDate(),
      profileID: `/Profiles/${user.uid}`,
    });

    setAppointmentName("");
    setDate(dayjs(new Date()));
    setAddress("");
    setNotes("");
  };
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  return (
    <Box className={styles.AddAppointmentWrapper}>
      {/* <Menubar></Menubar> */}
      <Box className={styles.AddNewAppointmentWrapper}>
        <CardContent className={styles.InputContainer} sx={{ boxShadow: 10 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" sx={{ margin: "1rem", color: "black" }}>
                Add Appointment
              </Typography>{" "}
            </Grid>
            <Divider sx={{ margin: 1 }} />
            <Grid item>
              <TextField
                size="small"
                id="standard-basic"
                label="Appointment Name"
                sx={{ m: 1, width: "30ch" }}
                className={styles.InputAppointment}
                required
                value={appointmentName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                onChange={(e) => setAppointmentName(e.target.value)}
              ></TextField>
              <Divider sx={{ margin: 1 }} />
              <TextField
                size="small"
                required
                label="Address"
                fullWidth
                sx={{ m: 1, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                onChange={(e) => setAddress(e.target.value)}
              ></TextField>
              <Divider sx={{ margin: 1 }} />
              <Grid item>
                <TextField
                  label="Notes"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                  fullWidth
                  multiline
                  sx={{ m: 1, width: "30ch" }}
                  rows={5}
                  size="small"
                ></TextField>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: 1 }} />
              <List>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        sx={{ m: 1, width: "30ch" }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </List>
              <Divider sx={{ margin: 1 }} />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="success"
            onClick={handleAddAppointment}
          >
            Add
          </Button>
        </CardContent>
      </Box>
    </Box>
  );
}

Appointment.propTypes = {};

Appointment.defaultProps = {};
