import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";

export default function Appointment() {
  return (
    <Card sx={{ boxShadow: 15, margin: 2, maxWidth: 650, maxHeight: 650 }}>
      <CardContent>
        <List>
          <ListItem disablePadding>
            <CreateIcon sx={{ marginRight: 1 }} />
            <ListItemText id="NameTab" primary="Name" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
          <ListItem disablePadding>
            <CalendarMonthIcon sx={{ marginRight: 1 }} />
            <ListItemText id="DateTab" primary="Date" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
          <ListItem disablePadding>
            <PlaceIcon sx={{ marginRight: 1 }} />
            <ListItemText id="LocationTab" primary="Location" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
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
