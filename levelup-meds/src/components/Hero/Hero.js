import React from "react";
import PropTypes from "prop-types";
import styles from "./Hero.module.scss";

const Hero = (imageSrc) => (
  <div className={styles.Hero}>
    <img src={imageSrc} alt="medicalFirst" classNam={styles.HeroImage}></img>
  </div>
);

Hero.propTypes = {};

Hero.defaultProps = {};

export default Hero;
