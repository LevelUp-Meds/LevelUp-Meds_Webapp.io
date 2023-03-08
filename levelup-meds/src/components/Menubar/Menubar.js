import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Menubar.module.scss";
import { AppBar, Toolbar, Box, Button, Divider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
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
import Typography from "@mui/material/Typography";
import { doc, getDoc } from "firebase/firestore";
import auth from "../Auth/AuthProvider";
import db from "../database/FirestoreConfig";

var menu = "open";

export default function Menubar() {
  const { logout } = UserAuth();
  //const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useSignup();
  const [data, setData] = useState(null);

  const [state, setState] = React.useState({
    open: false,
  });

  const findUserInfo = async (user) => {
    const docRef = doc(db, "Profiles", user.uid);
    const docSnap = await getDoc(docRef);
    const obj = docSnap.data();
    const firstName = obj.firstName;
    const lastName = obj.lastName;
    const newObject = {
      firstName,
      lastName,
    };

    setData({ ...data, ...newObject });

    // if (docSnap.exists()) {
    //   setData({...data, ...newObject})
    // } else {
    //   console.log("No Document Exists");
    // }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        findUserInfo(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      if (!user) {
        <redirect to="/login"></redirect>;
      }
    } catch (e) {}
  };
  const calenderdirect = async () => {
    try {
      await logout();
      navigate("/calendar");
      if (!user) {
        <redirect to="/calendar"></redirect>;
      }
    } catch (e) {}
  };

  const handleAppointment = () => {
    navigate("/appointment");
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleInbox = () => {
    navigate("/inboxpage");
  };

  const handleMedication = () => {

  }
  const toggleDrawer =
    (anchor, open) => (event) => {
      setState({ ...state, [anchor]: open });
    };
  const list = (anchor) => (
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
            <ListItemText primary="Medications" onClick={handleMedication} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
        <ListItem disablePadding>
          <ListItemButton>
            <EventIcon sx={{ margin: 1 }} />
            <ListItemText primary="Appointments" onClick={handleAppointment} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: 0 }} />
        <ListItem disablePadding>
          <ListItemButton>
            <CalendarMonthIcon sx={{ margin: 1 }} />
            <ListItemText primary="Calendar" onClick={handleCalendar} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <MailIcon sx={{ margin: 1 }} />
            <ListItemText primary="Inbox" onClick={handleInbox} />
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
                <Box
                  sx={{
                    mr: 0,
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">{`${user.displayName}`}</Typography>
                  <Button color="inherit" onClick={handleDashboard}>
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
