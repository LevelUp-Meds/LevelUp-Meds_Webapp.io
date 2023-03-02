import React from "react";
import PropTypes from "prop-types";
import "../Slider/Slider.module.scss";
import styles from "./Slider.module.scss";
import { useInView } from "react-intersection-observer";

const Slider = ({ imageSrc, title, subTitle, flipped }) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          <img src={imageSrc} className={styles.SliderImage} alt="slider"></img>
          <div className={styles.SliderContent}>
            <h1 className={styles.SliderTitle}>{title}</h1>
            <p>{subTitle}</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.SliderContent}>
            <h1 className={styles.SliderTitle}>{title}</h1>
            <p>{subTitle}</p>
          </div>
          <img src={imageSrc} className={styles.SliderImage} alt="slider"></img>
        </>
      );
    }
  };
  return (
    <div className={inView ? styles.SliderZoom : styles.Slider} ref={ref}>
      {renderContent()}
    </div>
  );
};

export default Slider;
