import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import LUMFooter from "../../assets/Logo_Orange-Gray.jpg";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { height } from "@mui/system";

export default function Footer() {
  const [value, setValue] = useState("");
  return (
    <Box className={styles.FooterContainer} sx={{ color: "white" }}>
      <Box className={styles.FooterMain}>
        <Box className={styles.FooterMainInner}>
          <h3>LevelUp Meds</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            minima repellendus? Unde voluptates eligendi, accusamus minima
            consequuntur blanditiis! Corporis odit voluptatibus modi
            exercitationem atque id aliquid quo minima quibusdam necessitatibus.
          </p>
        </Box>
      </Box>
      <Box className={styles.FooterSecond}>
        <h3>Product</h3>
      </Box>
      <Box className={styles.FooterThird}>
        <h3>Useful Links</h3>
      </Box>
      <Box className={styles.FooterFourth}>
        <h3>Address</h3>
      </Box>
    </Box>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};
