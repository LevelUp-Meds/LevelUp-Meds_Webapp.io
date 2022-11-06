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

export default function medication() {
  return (
    <Card sx={{ boxShadow: 15, margin: 2, maxWidth: 650, maxHeight: 650 }}>
      <CardContent>
        <List>
          <ListItem disablePadding>
            <CreateIcon sx={{ marginRight: 1 }} />
            <ListItemText id="NameId" primary="Name" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
          <ListItem disablePadding>
          <CreateIcon sx={{ marginRight: 1 }} />
            <ListItemText id="DosageId" primary="Dosage" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
          <ListItem disablePadding>
          <CreateIcon sx={{ marginRight: 1 }} />
            <ListItemText id="TimeID" primary="Time" />
          </ListItem>
          <Divider sx={{ margin: 1 }} />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText id = "ReOccurenceId" primary="Reoccurence"/>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

medication.propTypes = {};

medication.defaultProps = {};