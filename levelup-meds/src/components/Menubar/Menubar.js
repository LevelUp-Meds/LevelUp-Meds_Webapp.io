import React from "react";
import PropTypes from "prop-types";
import styles from "./Menubar.module.scss";
import { AppBar, Toolbar, Box, Button, Divider } from "@mui/material";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LUMLogo from "../../assets/Logo_Orange.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

type menu = "open";

export default function Menubar() {
  const { logout } = UserAuth();
  //const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useSignup();

  const [state, setState] = React.useState({
    open: false,
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      if (!user) {
        <redirect to="/login"></redirect>;
      }
    } catch (e) {}
  };
  const calanderdirect = async () => {
    try {
      await logout();
      navigate("/calender");
      if (!user) {
        <redirect to="/calender"></redirect>;
      }
    } catch (e) {}
  };
  const inboxdirect = async () => {
    try {
      await logout();
      navigate("/inbox");
      if (!user) {
        <redirect to="/inbox"></redirect>;
      }
    } catch (e) {}
  };
  const appointmentdirect = async () => {
    try {
      await logout();
      navigate("/appointment");
      if (!user) {
        <redirect to="/appointment"></redirect>;
      }
    } catch (e) {}
  };
  const medicationsdirect = async () => {
    try {
      await logout();
      navigate("/medication");
      if (!user) {
        <redirect to="/medication"></redirect>;
      }
    } catch (e) {}
  };
  const toggleDrawer =
    (anchor: menu, open: boolean) => (event: React.MouseEvent) => {
      setState({ ...state, [anchor]: open });
    };
  const list = (anchor: menu) => (
    <Box
      sx={{ width: anchor === "right" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{ justifyContent: "right", padding: 2 }}>
          <Button>
            <CloseIcon sx={{ margin: 1 }} color="action" />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <MedicationIcon sx={{ margin: 1 }} />
            <ListItemText primary="Medications" onClick={medicationsdirect}/>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
        <ListItem disablePadding>
          <ListItemButton>
            <EventIcon sx={{ margin: 1 }} />
            <ListItemText primary="Appointments" onClick={appointmentdirect}/>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
        <ListItem disablePadding>
          <ListItemButton>
            <CalendarMonthIcon sx={{ margin: 1 }} />
            <ListItemText primary="Calendar"onClick={calanderdirect} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <MailIcon sx={{ margin: 1 }} />
            <ListItemText primary="Inbox" onClick={inboxdirect}/>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
        <ListItem disablePadding>
          <ListItemButton>
            <LogoutIcon sx={{ margin: 1 }} />
            <ListItemText primary="Logout" onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
      </List>
    </Box>
  );

  return (
    <div>
      {["open"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Box className={styles.navbar} sx={{ bgcolor: "white" }}>
            <AppBar
              sx={{ bgcolor: "transparent", color: "black" }}
              position="static"
            >
              <Toolbar>
                <Box sx={{ mr: "auto" }}>
                  <Button onClick={toggleDrawer(anchor, true)} color="inherit">
                    <MenuIcon fontSize="large" />
                  </Button>
                </Box>
                <Box sx={{ mr: 0, ml: "auto" }}>
                  <Button color="inherit">
                    <img
                      className={styles.levelupmedslogo}
                      src={LUMLogo}
                      alt="main-logo"
                    ></img>
                  </Button>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
