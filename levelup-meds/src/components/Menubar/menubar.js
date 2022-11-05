import React from "react";
import PropTypes from "prop-types";
import styles from "./Menubar.module.scss";
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
import LUMLogo from "../../assets/Logo_Orange.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


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
      sx={{width: anchor === "right" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <CloseIcon/>
          </ListItemButton>
        </ListItem>
        {["Medications", "Calendar", "Login", "Sign In"].map((text, index) => (
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
                      <MenuIcon fontSize="large"/>
                    </Button>
                  </Box>
                  <Box sx={{mr: 0, ml: 'auto'}}>
                    <Button color="inherit">
                      <img className={styles.levelupmedslogo} src={LUMLogo} alt="main-logo"></img>
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

Menubar.propTypes = {};

Menubar.defaultProps = {};

export {Menubar};