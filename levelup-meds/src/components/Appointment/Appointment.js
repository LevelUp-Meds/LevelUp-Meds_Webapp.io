import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import styles from "./Appointment.module.scss";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { style } from "@mui/system";
import LUMLogo from "../../assets/Logo_Orange.svg";
import LevelUpShowcase from "../../assets/showcase.webp";
import LevelUpLargeLogo from "../../assets/levelupmeds_large_logo.webp";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateIcon from '@mui/icons-material/Create';


export default function Appointment() {
  return (
    <Card sx={{boxShadow: 15, margin: 2, maxWidth: 650, maxHeight:650}}>
      <CardContent>
        <List>
          <ListItem disablePadding>
            <CreateIcon sx={{marginRight: 1}}/>
            <ListItemText primary="Name" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem disablePadding>
            <CalendarMonthIcon sx={{marginRight: 1}}/>
            <ListItemText primary="Date" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem disablePadding>
            <PlaceIcon sx={{marginRight: 1}}/>
            <ListItemText primary="Location" />
          </ListItem>
          <Divider sx={{margin: 1}}/>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="MapTo BTN" />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

Appointment.propTypes = {};

Appointment.defaultProps = {};

export {Appointment};