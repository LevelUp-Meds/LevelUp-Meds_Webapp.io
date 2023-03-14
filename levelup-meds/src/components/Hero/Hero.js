import React from "react";
import PropTypes from "prop-types";
import styles from "./Hero.module.scss";
import { Box } from "@mui/material";

const Hero = ({ imageSrc }) => (
  <Box className={styles.Hero}>
    <img src={imageSrc} alt="medicalFirst" className={styles.HeroImage}></img>
    <h1 className={styles.HeroTitle}>Your Health Made Simple.</h1>
  </Box>
);

export default Hero;
