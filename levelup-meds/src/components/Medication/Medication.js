import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import styles from "./Medication.module.scss";
import {
  TextField,
  InputAdornment,
  Typography,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Menubar from "../Menubar/Menubar";
import cabinetpill from "../../assets/cabinet-pill.png";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "../database/FirestoreConfig";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Medication = () => {
  const [d, setD] = useState(new Date());
  const [date, setDate] = useState(dayjs(d));
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const [unit, setUnit] = useState("");
  const { user } = UserAuth();

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleDays = (day) => {
    setFrequency({ ...frequency, [day.target.name]: day.target.checked });
  };

  const handleAddMedication = async () => {
    // const q = query(collection(db, "Medications"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
    // await addDoc(collection(db, "Medications"), {
    //   name: medicationName,
    //   amount: `${dosage}${unit}`,
    //   time: date.toDate(),
    //   days: frequency,
    //   profileID: `/Profiles/${user.uid}`,
    // });

    setMedicationName("");
    setDosage("");
    setDate(dayjs(new Date()));
    setFrequency({});
  };

  const handleUnit = (event) => {
    setUnit(event.target.value);
  };

  return (
    <Box className={styles.MedWrapper}>
      {/* <Menubar></Menubar> */}
      <Box className={styles.AddNewMedWrapper}>
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
                Add New Medication
              </Typography>{" "}
            </Grid>
            <Divider sx={{ margin: 1 }} />
            <Grid item>
              <TextField
                size="small"
                id="standard-basic"
                label="Drug Name"
                sx={{ m: 1, width: "30ch" }}
                className={styles.InputMedication}
                required
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicationRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Divider sx={{ margin: 1 }} />
            </Grid>
            <Grid item xs={9}>
              <TextField
                size="small"
                label="Dosage"
                value={dosage}
                className={styles.InputDosage}
                required
                onChange={(e) => setDosage(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <VaccinesIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <InputLabel id="demo-select-small"></InputLabel>
                <Select size="small" value={unit} onChange={handleUnit}>
                  <MenuItem value="Mg">mL</MenuItem>
                  <MenuItem value="mL">Mg</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: 1 }} />
              <List>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    value={date}
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
            <Grid item xs={12}>
              <Typography variant="body1">Frequency</Typography>
              <Box>
                {days.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox name={day} onChange={(e) => handleDays(e)} />
                    }
                    label={day}
                  ></FormControlLabel>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddMedication}
          >
            Add
          </Button>
        </CardContent>
      </Box>
    </Box>
  );
};

export default Medication;
