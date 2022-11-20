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
  
  import Drawer from "@mui/material/Drawer";
  import List from "@mui/material/List";
  import ListItem from "@mui/material/ListItem";
  import ListItemButton from "@mui/material/ListItemButton";
  import ListItemText from "@mui/material/ListItemText";
  import { style } from "@mui/system";
  import Person from "@mui/icons-material/Person";
import LUMLogo from "../../assets/Logo_Orange.svg";
import LevelUpShowcase from "../../assets/showcase.webp";
import LevelUpLargeLogo from "../../assets/levelupmeds_large_logo.webp";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";


type menu = "open";

export default function Menubar() {
  const [state, setState] = React.useState({
    open: false
  });

  const toggleDrawer = (anchor: menu, open: boolean) => (
    event: React.MouseEvent
  ) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: menu) => (
    <Box
      sx={{ width: anchor === "right" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
              <ListItemText primary="X"/>
          </ListItemButton>
        </ListItem>
        {["Medications", "Calendar", "Login"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["open"]).map((anchor) => (
        <React.Fragment key={anchor}>
        <Box className={styles.navbar} sx={{ bgcolor: "white"}}>
          <AppBar sx={{bgcolor: "transparent", color:"black"}} position="static">
              <Toolbar>
                  <Box sx={{mr: 'auto'}}>
                    <Button onClick={toggleDrawer(anchor, true)} color="inherit">
                      <img className={styles.levelupmedslogo} src={LUMLogo} alt="main-logo"></img>
                    </Button>
                  </Box>
                  <Box sx={{mr: 0, ml: 'auto'}}>
                    <Button color="inherit" sx={{ margin: .1, mr: 1, fontWeight: 'bold', bgcolor: "white"}}>Sign Up</Button>
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

Menubar.propTypes = {};

Menubar.defaultProps = {};

export {Menubar};